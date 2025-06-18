"use client";

import { useEffect, useRef, useState } from "react";
import { getSocket } from "@/lib/socket";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export function RealtimeDemo() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const socketRef = useRef<any>(null);

  useEffect(() => {
    const socket = getSocket();
    socketRef.current = socket;

    socket.on("message", (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socketRef.current.emit("message", input);
      setInput("");
    }
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Real-Time Chat Demo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48 overflow-y-auto border rounded mb-4 p-2 bg-muted">
          {messages.length === 0 ? (
            <p className="text-muted-foreground text-sm">No messages yet.</p>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className="mb-1 text-sm">
                {msg}
              </div>
            ))
          )}
        </div>
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button onClick={sendMessage} variant="default" size="icon" aria-label="Send">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 