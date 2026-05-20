import { io } from "socket.io-client";

const socket = io(
  "https://cricket-backend-chwe.onrender.com"
);

export default socket;