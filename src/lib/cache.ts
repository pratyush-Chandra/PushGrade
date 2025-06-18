import { NextResponse } from 'next/server';

export type CacheType = 'public' | 'private' | 'none';

export interface CacheOptions {
  type: CacheType;
  maxAge?: number;
  etag?: string;
  lastModified?: Date;
}

/**
 * Add caching headers to a NextResponse
 * @param response - The NextResponse to add headers to
 * @param options - Cache configuration options
 * @returns The response with cache headers
 */
export function addCacheHeaders(
  response: NextResponse, 
  options: CacheOptions | CacheType,
  maxAge: number = 300
): NextResponse {
  const cacheOptions: CacheOptions = typeof options === 'string' 
    ? { type: options, maxAge } 
    : options;

  const { type, maxAge: age = 300, etag, lastModified } = cacheOptions;

  if (type === 'none') {
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  } else {
    const cacheControl = `${type}, max-age=${age}`;
    const sMaxAge = age * 2; // CDN cache time
    response.headers.set('Cache-Control', `${cacheControl}, s-maxage=${sMaxAge}`);
  }

  // Add ETag for cache validation
  if (etag) {
    response.headers.set('ETag', etag);
  } else {
    const generatedEtag = `"${Date.now()}-${Math.random().toString(36).substr(2, 9)}"`;
    response.headers.set('ETag', generatedEtag);
  }

  // Add Last-Modified header
  if (lastModified) {
    response.headers.set('Last-Modified', lastModified.toUTCString());
  } else {
    response.headers.set('Last-Modified', new Date().toUTCString());
  }

  return response;
}

/**
 * Generate an ETag based on content
 * @param content - The content to generate ETag for
 * @returns ETag string
 */
export function generateETag(content: string | object): string {
  const contentString = typeof content === 'string' ? content : JSON.stringify(content);
  const hash = contentString.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  return `"${Math.abs(hash).toString(36)}"`;
}

/**
 * Check if request has valid cached version
 * @param request - The incoming request
 * @param etag - The current ETag
 * @returns True if request has valid cache
 */
export function hasValidCache(request: Request, etag: string): boolean {
  const ifNoneMatch = request.headers.get('if-none-match');
  const ifModifiedSince = request.headers.get('if-modified-since');
  
  if (ifNoneMatch && ifNoneMatch === etag) {
    return true;
  }
  
  if (ifModifiedSince) {
    const lastModified = new Date(ifModifiedSince);
    const now = new Date();
    return lastModified.getTime() >= now.getTime() - 300000; // 5 minutes
  }
  
  return false;
}

/**
 * Return 304 Not Modified response
 * @param etag - The ETag for the cached content
 * @returns 304 response
 */
export function notModifiedResponse(etag: string): NextResponse {
  const response = new NextResponse(null, { status: 304 });
  response.headers.set('ETag', etag);
  return response;
}

/**
 * Predefined cache configurations for common use cases
 */
export const CacheConfig = {
  // Static content that rarely changes
  STATIC: { type: 'public' as const, maxAge: 31536000 }, // 1 year
  
  // Public data that changes occasionally
  PUBLIC: { type: 'public' as const, maxAge: 300 }, // 5 minutes
  
  // Private user data
  PRIVATE: { type: 'private' as const, maxAge: 60 }, // 1 minute
  
  // Dashboard data that updates frequently
  DASHBOARD: { type: 'private' as const, maxAge: 30 }, // 30 seconds
  
  // No caching for dynamic content
  NONE: { type: 'none' as const },
  
  // Questions and educational content
  QUESTIONS: { type: 'public' as const, maxAge: 300 }, // 5 minutes
  
  // User-specific interview data
  INTERVIEWS: { type: 'private' as const, maxAge: 120 }, // 2 minutes
  
  // Feedback data
  FEEDBACK: { type: 'private' as const, maxAge: 60 }, // 1 minute
} as const; 