"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar, 
  Target, 
  Zap,
  Loader2,
  CheckCircle,
  AlertCircle
} from "lucide-react";

// Simulate heavy computation
const simulateHeavyComputation = () => {
  const start = Date.now();
  let result = 0;
  for (let i = 0; i < 10000000; i++) {
    result += Math.random();
  }
  const end = Date.now();
  return { result, time: end - start };
};

// Simulate data fetching
const fetchAnalyticsData = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    totalInterviews: Math.floor(Math.random() * 1000) + 500,
    successRate: Math.floor(Math.random() * 30) + 70,
    averageScore: (Math.random() * 3 + 7).toFixed(1),
    activeUsers: Math.floor(Math.random() * 500) + 200,
    monthlyGrowth: Math.floor(Math.random() * 50) + 10,
    completionRate: Math.floor(Math.random() * 20) + 80
  };
};

export function HeavyComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [computationResult, setComputationResult] = useState<any>(null);
  const [isComputing, setIsComputing] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const analyticsData = await fetchAnalyticsData();
        setData(analyticsData);
      } catch (error) {
        console.error('Failed to load analytics data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const runHeavyComputation = () => {
    setIsComputing(true);
    // Use setTimeout to prevent blocking the UI
    setTimeout(() => {
      const result = simulateHeavyComputation();
      setComputationResult(result);
      setIsComputing(false);
    }, 100);
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="p-8">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading analytics data...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.totalInterviews?.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +{data?.monthlyGrowth}% from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.successRate}%</div>
              <p className="text-xs text-muted-foreground">
                +5% from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.averageScore}/10</div>
              <p className="text-xs text-muted-foreground">
                +0.3 from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.activeUsers?.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.completionRate}%</div>
              <p className="text-xs text-muted-foreground">
                +3% from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Performance</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98%</div>
              <p className="text-xs text-muted-foreground">
                System uptime
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Heavy Computation Section */}
      <Card>
        <CardHeader>
          <CardTitle>Heavy Computation Demo</CardTitle>
          <CardDescription>
            This simulates a computationally intensive task that could block the UI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Button 
              onClick={runHeavyComputation} 
              disabled={isComputing}
              className="flex items-center space-x-2"
            >
              {isComputing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Computing...</span>
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4" />
                  <span>Run Heavy Computation</span>
                </>
              )}
            </Button>
            
            {computationResult && (
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">
                  Completed in {computationResult.time}ms
                </span>
              </div>
            )}
          </div>

          {computationResult && (
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">Computation Results:</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Result:</span>
                  <span className="ml-2 font-mono">
                    {computationResult.result.toFixed(2)}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Time:</span>
                  <span className="ml-2 font-mono">{computationResult.time}ms</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>
            Real-time performance indicators for the application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">CPU Usage: 23%</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm">Memory: 1.2GB</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Network: 45ms</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 