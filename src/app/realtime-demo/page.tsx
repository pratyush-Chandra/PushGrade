import { Navbar } from "@/components/navbar";
import { RealtimeDemo } from "@/components/realtime-demo";

export default function RealtimeDemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <RealtimeDemo />
      </main>
    </div>
  );
} 