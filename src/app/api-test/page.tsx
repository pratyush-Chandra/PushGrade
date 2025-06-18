"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Database, Users, MessageSquare, HelpCircle, BarChart3, CheckCircle, XCircle } from "lucide-react";

interface ApiResponse {
  success: boolean;
  data?: any;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  message?: string;
  error?: string;
}

export default function ApiTestPage() {
  const [loading, setLoading] = useState(false);
  const [dataType, setDataType] = useState<string>("all");
  const [limit, setLimit] = useState<string>("10");
  const [page, setPage] = useState<string>("1");
  const [userId, setUserId] = useState<string>("");
  const [clerkId, setClerkId] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [response, setResponse] = useState<ApiResponse | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      
      if (dataType !== "all") {
        params.append('type', dataType);
      }
      
      params.append('limit', limit);
      params.append('page', page);
      
      if (userId) params.append('userId', userId);
      if (clerkId) params.append('clerkId', clerkId);
      if (category) params.append('category', category);
      if (difficulty) params.append('difficulty', difficulty);
      if (search) params.append('search', search);

      const url = `/api/data?${params.toString()}`;
      console.log('Fetching:', url);
      
      const res = await fetch(url);
      const data = await res.json();
      
      setResponse(data);
    } catch (error) {
      setResponse({
        success: false,
        message: 'Failed to fetch data',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
    setLoading(false);
  };

  const getDataTypeIcon = (type: string) => {
    switch (type) {
      case 'users': return <Users className="h-4 w-4" />;
      case 'interviews': return <MessageSquare className="h-4 w-4" />;
      case 'questions': return <HelpCircle className="h-4 w-4" />;
      case 'feedback': return <BarChart3 className="h-4 w-4" />;
      case 'dashboard': return <BarChart3 className="h-4 w-4" />;
      default: return <Database className="h-4 w-4" />;
    }
  };

  const getDataTypeLabel = (type: string) => {
    switch (type) {
      case 'users': return 'Users';
      case 'interviews': return 'Interviews';
      case 'questions': return 'Questions';
      case 'feedback': return 'Feedback';
      case 'dashboard': return 'Dashboard Data';
      default: return 'All Data';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">API Data Test Page</h1>
        <p className="text-muted-foreground">
          Test the comprehensive data API route with different parameters
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>API Parameters</CardTitle>
            <CardDescription>
              Configure the data fetch parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="dataType">Data Type</Label>
              <Select value={dataType} onValueChange={setDataType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Data</SelectItem>
                  <SelectItem value="users">Users</SelectItem>
                  <SelectItem value="interviews">Interviews</SelectItem>
                  <SelectItem value="questions">Questions</SelectItem>
                  <SelectItem value="feedback">Feedback</SelectItem>
                  <SelectItem value="dashboard">Dashboard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="limit">Limit</Label>
                <Input
                  id="limit"
                  type="number"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  min="1"
                  max="100"
                />
              </div>
              <div>
                <Label htmlFor="page">Page</Label>
                <Input
                  id="page"
                  type="number"
                  value={page}
                  onChange={(e) => setPage(e.target.value)}
                  min="1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="userId">User ID</Label>
              <Input
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Optional user ID filter"
              />
            </div>

            <div>
              <Label htmlFor="clerkId">Clerk ID</Label>
              <Input
                id="clerkId"
                value={clerkId}
                onChange={(e) => setClerkId(e.target.value)}
                placeholder="Optional Clerk ID filter"
              />
            </div>

            {dataType === 'questions' && (
              <>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="behavioral">Behavioral</SelectItem>
                      <SelectItem value="system-design">System Design</SelectItem>
                      <SelectItem value="algorithms">Algorithms</SelectItem>
                      <SelectItem value="frontend">Frontend</SelectItem>
                      <SelectItem value="backend">Backend</SelectItem>
                      <SelectItem value="devops">DevOps</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Difficulties</SelectItem>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="search">Search</Label>
                  <Input
                    id="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search questions..."
                  />
                </div>
              </>
            )}

            <Button 
              onClick={fetchData} 
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Fetching...
                </>
              ) : (
                <>
                  {getDataTypeIcon(dataType)}
                  <span className="ml-2">Fetch {getDataTypeLabel(dataType)}</span>
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {response && getDataTypeIcon(dataType)}
              API Response
            </CardTitle>
            <CardDescription>
              Results from the data API
            </CardDescription>
          </CardHeader>
          <CardContent>
            {response ? (
              <div className="space-y-4">
                {/* Status */}
                <div className="flex items-center gap-2">
                  {response.success ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <Badge variant={response.success ? "default" : "destructive"}>
                    {response.success ? "Success" : "Error"}
                  </Badge>
                  {response.message && (
                    <span className="text-sm text-muted-foreground">
                      {response.message}
                    </span>
                  )}
                </div>

                {/* Pagination Info */}
                {response.pagination && (
                  <div className="flex gap-4 text-sm">
                    <span>Page {response.pagination.page} of {response.pagination.pages}</span>
                    <span>Total: {response.pagination.total}</span>
                    <span>Limit: {response.pagination.limit}</span>
                  </div>
                )}

                {/* Data Summary */}
                {response.data && (
                  <div className="space-y-2">
                    {dataType === 'all' && response.data.summary && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold">{response.data.summary.users}</div>
                          <div className="text-sm text-muted-foreground">Users</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold">{response.data.summary.interviews}</div>
                          <div className="text-sm text-muted-foreground">Interviews</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold">{response.data.summary.questions}</div>
                          <div className="text-sm text-muted-foreground">Questions</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold">{response.data.summary.feedback}</div>
                          <div className="text-sm text-muted-foreground">Feedback</div>
                        </div>
                      </div>
                    )}

                    {dataType === 'dashboard' && response.data.statistics && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold">{response.data.statistics.totalInterviews}</div>
                          <div className="text-sm text-muted-foreground">Total Interviews</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold">{response.data.statistics.completedInterviews}</div>
                          <div className="text-sm text-muted-foreground">Completed</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold">{response.data.statistics.inProgressInterviews}</div>
                          <div className="text-sm text-muted-foreground">In Progress</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold">{Math.round(response.data.statistics.averageScore || 0)}</div>
                          <div className="text-sm text-muted-foreground">Avg Score</div>
                        </div>
                      </div>
                    )}

                    {/* Raw Data */}
                    <div>
                      <Label className="text-sm font-medium">Raw Response Data:</Label>
                      <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm mt-2 max-h-96">
                        {JSON.stringify(response, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}

                {/* Error Display */}
                {response.error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="text-red-800 font-medium">Error:</div>
                    <div className="text-red-600 text-sm">{response.error}</div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                Click "Fetch Data" to test the API
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 