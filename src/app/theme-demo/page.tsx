"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { ThemeStatus } from "@/components/theme/theme-status";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor, Palette, Eye, Code, Settings, Info } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4
    }
  }
};

export default function ThemeDemoPage() {
  const { theme, resolvedTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Theme Switching Demo</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Experience the power of dark and light themes with Next Themes
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <ThemeStatus showLabel={true} variant="outline" />
              <ThemeStatus showLabel={false} variant="secondary" />
              <ThemeStatus showIcon={false} variant="default" />
            </div>
            <div className="bg-muted/50 rounded-lg p-4 inline-block">
              <p className="text-sm font-medium">
                Current Theme: {theme} {resolvedTheme && `(${resolvedTheme})`}
              </p>
            </div>
          </motion.div>

          {/* Theme Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-primary" />
                    <CardTitle>Visual Comfort</CardTitle>
                  </div>
                  <CardDescription>
                    Switch between light and dark themes for optimal viewing experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Reduce eye strain with dark mode or enjoy crisp contrast with light mode.
                    The theme automatically adapts to your system preferences.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    <CardTitle>Developer Friendly</CardTitle>
                  </div>
                  <CardDescription>
                    Built with Next.js and Tailwind CSS for seamless integration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Easy to implement and customize. Uses CSS variables and Tailwind's
                    dark mode utilities for consistent theming across components.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Palette className="h-5 w-5 text-primary" />
                    <CardTitle>Persistent Preferences</CardTitle>
                  </div>
                  <CardDescription>
                    Your theme choice is saved and remembered across sessions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Theme preferences are stored in localStorage and automatically
                    applied when you return to the application.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* UI Components Showcase */}
          <motion.div variants={itemVariants} className="mb-12">
            <Card>
              <CardHeader>
                <CardTitle>UI Components in Different Themes</CardTitle>
                <CardDescription>
                  See how various components adapt to light and dark themes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Buttons */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Buttons</Label>
                  <div className="flex flex-wrap gap-3">
                    <Button>Primary Button</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                  </div>
                </div>

                {/* Inputs */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Input Fields</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Enter your name" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Enter your email" />
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Badges</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                </div>

                {/* Cards */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Cards</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Sample Card</CardTitle>
                        <CardDescription>
                          This card demonstrates theme adaptation
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Notice how the background, text, and border colors
                          automatically adjust based on the selected theme.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-muted/50">
                      <CardHeader>
                        <CardTitle className="text-lg">Muted Card</CardTitle>
                        <CardDescription>
                          Card with muted background
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          This card uses a muted background to show how
                          different background variants work in each theme.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Theme Information */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Theme Implementation Details</CardTitle>
                <CardDescription>
                  Technical information about the theme system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Features</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Automatic system theme detection</li>
                      <li>• Persistent theme storage in localStorage</li>
                      <li>• Smooth transitions between themes</li>
                      <li>• Hydration-safe implementation</li>
                      <li>• Accessible theme toggle with proper ARIA labels</li>
                      <li>• Framer Motion animations for enhanced UX</li>
                      <li>• Custom storage key: "pushgrade-theme"</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">next-themes</Badge>
                      <Badge variant="outline">Tailwind CSS</Badge>
                      <Badge variant="outline">Framer Motion</Badge>
                      <Badge variant="outline">Shadcn/ui</Badge>
                      <Badge variant="outline">React</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Storage Information</h4>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="text-sm text-muted-foreground">
                        <strong>Storage Key:</strong> pushgrade-theme<br />
                        <strong>Location:</strong> localStorage<br />
                        <strong>Values:</strong> "light", "dark", "system"
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
} 