import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center space-y-4 max-w-md w-full">
        <Ghost className="h-16 w-16 text-muted-foreground" />
        <h1 className="text-4xl font-bold text-center">404 - Page Not Found</h1>
        <p className="text-center text-muted-foreground">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Button asChild variant="default">
          <Link href="/">Go to Homepage</Link>
        </Button>
      </div>
    </div>
  );
} 