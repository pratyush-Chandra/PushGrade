"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    // Optionally log error to an error reporting service
    // console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center space-y-4 max-w-md w-full">
        <AlertTriangle className="h-12 w-12 text-destructive" />
        <h1 className="text-3xl font-bold text-center">Something went wrong</h1>
        <p className="text-center text-muted-foreground">
          Sorry, an unexpected error has occurred. Please try reloading the page or go back to the homepage.
        </p>
        <div className="flex space-x-2">
          <Button onClick={() => reset()} variant="default">
            Reload Page
          </Button>
          <Button onClick={() => router.push("/")} variant="outline">
            Go Home
          </Button>
        </div>
        <details className="mt-4 w-full bg-muted/50 rounded p-2 text-xs text-muted-foreground">
          <summary className="cursor-pointer">Error Details</summary>
          <pre className="whitespace-pre-wrap break-all">{error?.message}</pre>
        </details>
      </div>
    </div>
  );
} 