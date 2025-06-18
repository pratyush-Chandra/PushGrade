"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Zap, 
  Clock, 
  Download, 
  Cpu, 
  Network,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Info,
  HardDrive
} from "lucide-react";
import { LoadingComparison } from "@/components/loading-comparison";

// Lazy load the heavy component with SSR disabled
const LazyHeavyComponent = dynamic(
  () => import("@/components/heavy-component").then(mod => ({ default: mod.HeavyComponent })),
  { 
    ssr: false,
    loading: () => (
      <Card className="w-full">
        <CardContent className="p-8">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading heavy component...</span>
          </div>
        </CardContent>
      </Card>
    )
  }
);

// Performance metrics component
function PerformanceMetrics() {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    bundleSize: "0 KB",
    memoryUsage: "0 MB",
    networkRequests: 0
  });

  const measurePerformance = () => {
    const start = performance.now();
    
    // Simulate performance measurement
    setTimeout(() => {
      const end = performance.now();
      setMetrics({
        loadTime: Math.round(end - start),
        bundleSize: "245 KB",
        memoryUsage: "12.5 MB",
        networkRequests: 8
      });
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Cpu className="h-5 w-5" />
          <span>Performance Metrics</span>
        </CardTitle>
        <CardDescription>
          Real-time performance monitoring and optimization insights
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{metrics.loadTime}ms</div>
            <div className="text-xs text-muted-foreground">Load Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{metrics.bundleSize}</div>
            <div className="text-xs text-muted-foreground">Bundle Size</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{metrics.memoryUsage}</div>
            <div className="text-xs text-muted-foreground">Memory Usage</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{metrics.networkRequests}</div>
            <div className="text-xs text-muted-foreground">Network Requests</div>
          </div>
        </div>
        
        <Button onClick={measurePerformance} className="w-full">
          <Zap className="h-4 w-4 mr-2" />
          Measure Performance
        </Button>
      </CardContent>
    </Card>
  );
}

// Caching information component
function CachingInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Download className="h-5 w-5" />
          <span>Caching Strategy</span>
        </CardTitle>
        <CardDescription>
          How caching headers improve API performance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h4 className="font-medium">Browser Caching</h4>
              <p className="text-sm text-muted-foreground">
                Static assets cached for 1 year with immutable headers
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h4 className="font-medium">API Response Caching</h4>
              <p className="text-sm text-muted-foreground">
                GET requests cached for 5 minutes, POST requests not cached
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h4 className="font-medium">CDN Caching</h4>
              <p className="text-sm text-muted-foreground">
                Global content delivery with edge caching
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-medium mb-2">Cache Headers Example:</h4>
          <pre className="text-xs bg-background p-2 rounded">
{`Cache-Control: public, max-age=300, s-maxage=600
ETag: "abc123"
Last-Modified: Wed, 21 Oct 2023 07:28:00 GMT`}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}

// Optimization tips component
function OptimizationTips() {
  const tips = [
    {
      title: "Lazy Loading",
      description: "Load components only when needed using dynamic imports",
      icon: <Download className="h-4 w-4" />,
      status: "implemented"
    },
    {
      title: "Code Splitting",
      description: "Split code into smaller chunks for faster initial load",
      icon: <Cpu className="h-4 w-4" />,
      status: "implemented"
    },
    {
      title: "Image Optimization",
      description: "Use Next.js Image component for automatic optimization",
      icon: <HardDrive className="h-4 w-4" />,
      status: "pending"
    },
    {
      title: "Service Worker",
      description: "Cache API responses for offline functionality",
      icon: <Network className="h-4 w-4" />,
      status: "pending"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="h-5 w-5" />
          <span>Optimization Tips</span>
        </CardTitle>
        <CardDescription>
          Performance optimization techniques and their implementation status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-3 p-3 rounded-lg border"
            >
              <div className="flex-shrink-0">
                {tip.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium">{tip.title}</h4>
                  <Badge variant={tip.status === "implemented" ? "default" : "secondary"}>
                    {tip.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{tip.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function PerformanceDemoPage() {
  const [showHeavyComponent, setShowHeavyComponent] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold">Performance Optimization Demo</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore lazy loading, caching strategies, and performance optimization techniques
        </p>
      </motion.div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="lazy-loading">Lazy Loading</TabsTrigger>
          <TabsTrigger value="caching">Caching</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PerformanceMetrics />
            <CachingInfo />
          </div>
          <OptimizationTips />
        </TabsContent>

        <TabsContent value="lazy-loading" className="space-y-6">
          <LoadingComparison />
          
          <Card>
            <CardHeader>
              <CardTitle>Lazy Loading Demo</CardTitle>
              <CardDescription>
                This heavy component is loaded only when needed, improving initial page load time
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Button 
                  onClick={() => setShowHeavyComponent(!showHeavyComponent)}
                  variant={showHeavyComponent ? "outline" : "default"}
                >
                  {showHeavyComponent ? "Hide" : "Load"} Heavy Component
                </Button>
                
                <div className="flex items-center space-x-2">
                  <Info className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-muted-foreground">
                    Component will be loaded dynamically when clicked
                  </span>
                </div>
              </div>

              {showHeavyComponent && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Suspense fallback={
                    <Card>
                      <CardContent className="p-8">
                        <div className="flex items-center justify-center space-x-2">
                          <Loader2 className="h-6 w-6 animate-spin" />
                          <span>Loading component...</span>
                        </div>
                      </CardContent>
                    </Card>
                  }>
                    <LazyHeavyComponent />
                  </Suspense>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="caching" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>API Caching Headers</CardTitle>
                <CardDescription>
                  Example of how caching headers are implemented in API routes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Static Data (GET /api/data)</h4>
                    <pre className="text-xs bg-muted p-2 rounded">
{`Cache-Control: public, max-age=300
ETag: "data-v1"
Content-Type: application/json`}
                    </pre>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">User Data (GET /api/users)</h4>
                    <pre className="text-xs bg-muted p-2 rounded">
{`Cache-Control: private, max-age=60
ETag: "users-v2"
Content-Type: application/json`}
                    </pre>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Dynamic Data (POST /api/questions)</h4>
                    <pre className="text-xs bg-muted p-2 rounded">
{`Cache-Control: no-cache, no-store
Content-Type: application/json`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cache Performance</CardTitle>
                <CardDescription>
                  Impact of caching on response times
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Without Cache</span>
                    <Badge variant="destructive">450ms</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>With Browser Cache</span>
                    <Badge variant="default">15ms</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>With CDN Cache</span>
                    <Badge variant="default">5ms</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Memory Cache</span>
                    <Badge variant="default">1ms</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <PerformanceMetrics />
          
          <Card>
            <CardHeader>
              <CardTitle>Bundle Analysis</CardTitle>
              <CardDescription>
                JavaScript bundle size breakdown
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Main Bundle</span>
                  <span className="font-mono">156 KB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Heavy Component (Lazy)</span>
                  <span className="font-mono">89 KB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>UI Components</span>
                  <span className="font-mono">45 KB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Utilities</span>
                  <span className="font-mono">23 KB</span>
                </div>
                <div className="border-t pt-2 flex justify-between items-center font-medium">
                  <span>Total (Initial Load)</span>
                  <span className="font-mono">224 KB</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 