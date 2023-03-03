const express = require("express");         //Bu iki satırda express ve socket.io paketlerini projeye dahil ettim.
const socket = require("socket.io");

const app = express();      // Proje baslangıcı
const server = app.listen(7777);    // Porta gonderdim.

app.use(express.static("public"));

const io = socket(server)

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('chat', data => {
        io.sockets.emit('chat',data)
    })

    socket.on("typing",data => {
        socket.broadcast.emit("typing",data)
    })
})

