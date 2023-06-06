import io from "socket.io-client";

const socket = io("http://192.168.1.33:5002");
// const socket = io("http://192.168.2.124:5002");

export default socket;
