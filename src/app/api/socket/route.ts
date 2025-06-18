import { Server } from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Socket } from "net";

// Extend the Socket type to include a custom server property
interface NextSocket extends Socket {
  server: any;
}

const ioHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const socket = res.socket as NextSocket;
  const server = socket.server;
  if (!server.io) {
    const io = new Server(server, {
      path: "/api/socket/io",
      addTrailingSlash: false,
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

    io.on("connection", (socket) => {
      console.log("Socket connected:", socket.id);

      // Example: Broadcast a message to all clients
      socket.on("message", (msg) => {
        io.emit("message", msg);
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id);
      });
    });

    server.io = io;
  }
  res.end();
};

export default ioHandler;

export const config = {
  api: {
    bodyParser: false,
  },
}; 