import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket() {
  if (!socket) {
    socket = io({
      path: "/api/socket/io",
      transports: ["websocket"],
    });
  }
  return socket;
} 