import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Mic, Users, TrendingUp, Calendar, Target } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Track your interview progress and performance metrics
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
                <Mic className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground">
                  +5% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.5/10</div>
                <p className="text-xs text-muted-foreground">
                  +0.3 from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Practice Hours</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42h</div>
                <p className="text-xs text-muted-foreground">
                  +8h from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Interviews</CardTitle>
                <CardDescription>
                  Your latest interview sessions and results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "React Developer Interview", score: "9.2/10", date: "2 hours ago" },
                    { title: "Node.js Backend Interview", score: "8.7/10", date: "1 day ago" },
                    { title: "System Design Interview", score: "7.9/10", date: "3 days ago" },
                    { title: "JavaScript Fundamentals", score: "9.5/10", date: "1 week ago" },
                  ].map((interview, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <p className="font-medium">{interview.title}</p>
                        <p className="text-sm text-muted-foreground">{interview.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">{interview.score}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>
                  Your improvement over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Technical Skills</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Communication</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Problem Solving</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">System Design</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                      <span className="text-sm font-medium">70%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Start a new interview or review your progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button className="gap-2">
                  <Mic className="h-4 w-4" />
                  Start New Interview
                </Button>
                <Button variant="outline" className="gap-2">
                  <BarChart3 className="h-4 w-4" />
                  View Analytics
                </Button>
                <Button variant="outline" className="gap-2">
                  <Users className="h-4 w-4" />
                  Join Community
                </Button>
                <Button variant="outline" className="gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Set Goals
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
} 