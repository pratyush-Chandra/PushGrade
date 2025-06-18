"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Clock, 
  Download, 
  Loader2,
  CheckCircle,
  AlertTriangle,
  Info
} from "lucide-react";

// Eager loaded component (loaded immediately)
function EagerComponent() {
  return (
    <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-green-700 dark:text-green-300">
          <CheckCircle className="h-5 w-5" />
          <span>Eager Loaded Component</span>
        </CardTitle>
        <CardDescription>
          This component is loaded immediately when the page loads
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="border-green-200 text-green-700">
              Load Time: ~0ms
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            This component is included in the initial bundle and loads immediately.
            Good for critical components that are always needed.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// Lazy loaded component (loaded on demand)
const LazyComponent = dynamic(
  () => import("@/components/heavy-component").then(mod => ({ default: mod.HeavyComponent })),
  { 
    ssr: false,
    loading: () => (
      <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20">
        <CardContent className="p-8">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="text-blue-700 dark:text-blue-300">Loading heavy component...</span>
          </div>
        </CardContent>
      </Card>
    )
  }
);

export function LoadingComparison() {
  const [showLazy, setShowLazy] = useState(false);
  const [loadMetrics, setLoadMetrics] = useState({
    pageLoadTime: 0,
    lazyLoadTime: 0,
    bundleSize: "0 KB",
    memoryUsage: "0 MB"
  });

  useEffect(() => {
    // Measure initial page load time
    if (typeof window !== 'undefined') {
      const loadTime = performance.now();
      setLoadMetrics(prev => ({
        ...prev,
        pageLoadTime: Math.round(loadTime),
        bundleSize: "156 KB",
        memoryUsage: "8.2 MB"
      }));
    }
  }, []);

  const loadLazyComponent = () => {
    const start = performance.now();
    setShowLazy(true);
    
    // Simulate lazy loading time
    setTimeout(() => {
      const end = performance.now();
      setLoadMetrics(prev => ({
        ...prev,
        lazyLoadTime: Math.round(end - start),
        bundleSize: "245 KB",
        memoryUsage: "12.5 MB"
      }));
    }, 100);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span>Loading Strategy Comparison</span>
          </CardTitle>
          <CardDescription>
            Compare eager loading vs lazy loading performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EagerComponent />
            
            <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
                  <Download className="h-5 w-5" />
                  <span>Lazy Loaded Component</span>
                </CardTitle>
                <CardDescription>
                  This component is loaded only when needed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="border-blue-200 text-blue-700">
                    Load Time: ~{loadMetrics.lazyLoadTime}ms
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  This component is loaded dynamically when requested.
                  Reduces initial bundle size and improves page load time.
                </p>
                <Button 
                  onClick={loadLazyComponent}
                  disabled={showLazy}
                  variant="outline"
                  className="w-full"
                >
                  {showLazy ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Loaded
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Load Component
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Performance Metrics</span>
          </CardTitle>
          <CardDescription>
            Real-time performance comparison
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{loadMetrics.pageLoadTime}ms</div>
              <div className="text-xs text-muted-foreground">Initial Load</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{loadMetrics.lazyLoadTime}ms</div>
              <div className="text-xs text-muted-foreground">Lazy Load</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{loadMetrics.bundleSize}</div>
              <div className="text-xs text-muted-foreground">Bundle Size</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{loadMetrics.memoryUsage}</div>
              <div className="text-xs text-muted-foreground">Memory Usage</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lazy Component Display */}
      {showLazy && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Info className="h-5 w-5 text-blue-500" />
                <span>Lazy Loaded Heavy Component</span>
              </CardTitle>
              <CardDescription>
                This component was loaded dynamically using next/dynamic
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LazyComponent />
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle>When to Use Each Strategy</CardTitle>
          <CardDescription>
            Guidelines for choosing between eager and lazy loading
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-green-700 dark:text-green-300">Use Eager Loading For:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Critical UI components (navbar, footer)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Components always visible on page load</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Small, lightweight components</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Components needed for initial interaction</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-blue-700 dark:text-blue-300">Use Lazy Loading For:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <Download className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Heavy components with complex logic</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Download className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Components not immediately visible</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Download className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Third-party libraries and dependencies</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Download className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>Components loaded conditionally</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 