const app = require("./server");

const port = process.env.PORT || 3003;

app.listen(port, () =>
  console.log(`Express now departing from port ${port}...`)
);

// Socket io stuff

const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
server.use(cors("*"));
const io = socketio(server)
// const io = socketio(server, {
//   cors: {
//     origin: /netlify/,
//     methods: ["GET", "POST"],
//     allowedHeaders: [],
//     credentials: true,
//   },
// });



io.on('connection', socket => {
  console.log("it connected")
  socket.on('create-room', (username, room, difficulty, category) => {
    socket.to(room).emit('start-game',username, difficulty, category)

  });

  socket.on("join-room", (username, room) => {
    socket.to(room).emit("join-game", username);
  });

  socket.on("game-over", (username, room, score) => {
    socket.to(room).emit("end-game", username, score);
  });
});
