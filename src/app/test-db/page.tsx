"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Database, Users, HelpCircle, CheckCircle, XCircle } from "lucide-react";

interface TestResult {
  success: boolean;
  message: string;
  error?: string;
  count?: number;
  users?: any[];
  questions?: any[];
}

interface TestResults {
  connection?: TestResult;
  users?: TestResult;
  createUser?: TestResult;
  questions?: TestResult;
  createQuestion?: TestResult;
}

export default function TestDBPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<TestResults>({});

  const testConnection = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test/connection');
      const data = await response.json();
      setResults((prev: TestResults) => ({ ...prev, connection: data }));
    } catch (error) {
      setResults((prev: TestResults) => ({ 
        ...prev, 
        connection: { 
          success: false, 
          message: 'Connection test failed',
          error: error instanceof Error ? error.message : 'Unknown error'
        } 
      }));
    }
    setLoading(false);
  };

  const testUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test/users');
      const data = await response.json();
      setResults((prev: TestResults) => ({ ...prev, users: data }));
    } catch (error) {
      setResults((prev: TestResults) => ({ 
        ...prev, 
        users: { 
          success: false, 
          message: 'Users test failed',
          error: error instanceof Error ? error.message : 'Unknown error'
        } 
      }));
    }
    setLoading(false);
  };

  const createTestUser = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clerkId: `test_${Date.now()}`,
          email: `test${Date.now()}@example.com`,
          firstName: 'Test',
          lastName: 'User',
          experienceLevel: 'intermediate',
          preferredTechnologies: ['javascript', 'react', 'nodejs'],
        }),
      });
      const data = await response.json();
      setResults((prev: TestResults) => ({ ...prev, createUser: data }));
    } catch (error) {
      setResults((prev: TestResults) => ({ 
        ...prev, 
        createUser: { 
          success: false, 
          message: 'Create user test failed',
          error: error instanceof Error ? error.message : 'Unknown error'
        } 
      }));
    }
    setLoading(false);
  };

  const testQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test/questions');
      const data = await response.json();
      setResults((prev: TestResults) => ({ ...prev, questions: data }));
    } catch (error) {
      setResults((prev: TestResults) => ({ 
        ...prev, 
        questions: { 
          success: false, 
          message: 'Questions test failed',
          error: error instanceof Error ? error.message : 'Unknown error'
        } 
      }));
    }
    setLoading(false);
  };

  const createTestQuestion = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: 'What is the difference between let, const, and var in JavaScript?',
          category: 'technical',
          subcategory: 'javascript',
          difficulty: 'medium',
          experienceLevel: 'intermediate',
          technologies: ['javascript'],
          type: 'open-ended',
        }),
      });
      const data = await response.json();
      setResults((prev: TestResults) => ({ ...prev, createQuestion: data }));
    } catch (error) {
      setResults((prev: TestResults) => ({ 
        ...prev, 
        createQuestion: { 
          success: false, 
          message: 'Create question test failed',
          error: error instanceof Error ? error.message : 'Unknown error'
        } 
      }));
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Database Test Page</h1>
        <p className="text-muted-foreground">
          Test your MongoDB connection and model operations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Connection Test
            </CardTitle>
            <CardDescription>
              Test the MongoDB connection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={testConnection} 
              disabled={loading}
              className="w-full"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Test Connection'}
            </Button>
            {results.connection && (
              <div className="mt-4">
                <div className="flex items-center gap-2">
                  {results.connection.success ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <Badge variant={results.connection.success ? "default" : "destructive"}>
                    {results.connection.success ? "Success" : "Failed"}
                  </Badge>
                </div>
                <p className="text-sm mt-2">{results.connection.message}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Operations
            </CardTitle>
            <CardDescription>
              Test User model operations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={testUsers} 
              disabled={loading}
              className="w-full"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Get Users'}
            </Button>
            <Button 
              onClick={createTestUser} 
              disabled={loading}
              variant="outline"
              className="w-full"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create Test User'}
            </Button>
            {results.users && (
              <div className="mt-4">
                <div className="flex items-center gap-2">
                  {results.users.success ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <Badge variant={results.users.success ? "default" : "destructive"}>
                    {results.users.success ? "Success" : "Failed"}
                  </Badge>
                </div>
                <p className="text-sm mt-2">
                  {results.users.success ? `${results.users.count} users found` : results.users.message}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Question Operations
            </CardTitle>
            <CardDescription>
              Test Question model operations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={testQuestions} 
              disabled={loading}
              className="w-full"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Get Questions'}
            </Button>
            <Button 
              onClick={createTestQuestion} 
              disabled={loading}
              variant="outline"
              className="w-full"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create Test Question'}
            </Button>
            {results.questions && (
              <div className="mt-4">
                <div className="flex items-center gap-2">
                  {results.questions.success ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <Badge variant={results.questions.success ? "default" : "destructive"}>
                    {results.questions.success ? "Success" : "Failed"}
                  </Badge>
                </div>
                <p className="text-sm mt-2">
                  {results.questions.success ? `${results.questions.count} questions found` : results.questions.message}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Results Display */}
      {Object.keys(results).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
            <CardDescription>
              Detailed results from all tests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm">
              {JSON.stringify(results, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 