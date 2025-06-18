"use client";

import { useEffect, useRef } from "react";
import { useInfiniteQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Clock, Target, Star, Loader2 } from "lucide-react";

const PAGE_SIZE = 10;

async function fetchInterviews({ pageParam = 1 }) {
  const res = await fetch(`/api/data?type=interviews&page=${pageParam}&limit=${PAGE_SIZE}`);
  if (!res.ok) throw new Error("Failed to fetch interviews");
  return res.json();
}

function InfiniteInterviewsList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["interviews"],
    queryFn: fetchInterviews,
    getNextPageParam: (lastPage, allPages) => {
      const { pagination } = lastPage;
      if (pagination.page < pagination.pages) {
        return pagination.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // IntersectionObserver to auto-load next page
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "pending") {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center text-destructive py-8">
        Error loading interviews: {error.message}
      </div>
    );
  }

  const interviews = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Infinite Interviews</h1>
      <div className="space-y-4">
        {interviews.map((interview: any) => (
          <Card key={interview._id}>
            <CardHeader>
              <CardTitle>{interview.title || "Untitled Interview"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <div>Status: {interview.status}</div>
                <div>Type: {interview.type}</div>
                <div>Experience: {interview.experienceLevel}</div>
                <div>Score: {interview.score ?? "N/A"}</div>
                <div>Date: {new Date(interview.createdAt).toLocaleString()}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div ref={loadMoreRef} className="flex justify-center py-6">
        {isFetchingNextPage ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : hasNextPage ? (
          <span className="text-muted-foreground">Scroll to load more...</span>
        ) : (
          <span className="text-muted-foreground">No more interviews</span>
        )}
      </div>
    </div>
  );
}

const queryClient = new QueryClient();

export default function InterviewsPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold mb-2">Interviews</h1>
              <p className="text-muted-foreground">
                Start a new interview or review your past sessions
              </p>
            </div>

            {/* Quick Start */}
            <Card>
              <CardHeader>
                <CardTitle>Start New Interview</CardTitle>
                <CardDescription>
                  Choose your interview type and difficulty level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="h-24 flex-col gap-2">
                    <Mic className="h-6 w-6" />
                    <span>Technical Interview</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col gap-2">
                    <Target className="h-6 w-6" />
                    <span>System Design</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col gap-2">
                    <Star className="h-6 w-6" />
                    <span>Behavioral</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Interviews */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Interviews</CardTitle>
                <CardDescription>
                  Your latest interview sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "React Developer Interview", type: "Technical", score: "9.2/10", duration: "45 min", date: "2 hours ago" },
                    { title: "Node.js Backend Interview", type: "Technical", score: "8.7/10", duration: "38 min", date: "1 day ago" },
                    { title: "System Design Interview", type: "System Design", score: "7.9/10", duration: "52 min", date: "3 days ago" },
                    { title: "JavaScript Fundamentals", type: "Technical", score: "9.5/10", duration: "30 min", date: "1 week ago" },
                  ].map((interview, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Mic className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{interview.title}</p>
                          <p className="text-sm text-muted-foreground">{interview.type} • {interview.duration}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">{interview.score}</p>
                        <p className="text-sm text-muted-foreground">{interview.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <InfiniteInterviewsList />
    </QueryClientProvider>
  );
} 