import express from "express";
import http from "node:http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(cors({ origin: "http://localhost:5173" }));

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log(`User connected with: ${socket.id}`);

  socket.on("create-room", (roomNo) => {
    console.log(`Create room no. ${roomNo}`);
    socket.join(roomNo);

    // logs
    console.log([...io.sockets.adapter.rooms.keys()]);
  });

  socket.on("join-room", (roomNo) => {
    console.log(`Join room no. ${roomNo}`);

    if (io.sockets.adapter.rooms.has(roomNo)) {
      socket.join(roomNo);

      socket.to(roomNo).emit("new-user", `your friend id: ${socket.id}`);
    } else {
      socket.emit("error", "Room does not exist");
    }
  });

  socket.on("challenger", ([roomNo, opponentId]) => {
    socket.to(roomNo).emit("opponentId", `your friend id: ${opponentId}`);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected with: ${socket.id}`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
