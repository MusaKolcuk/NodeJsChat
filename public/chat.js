const socket = io.connect('http://localhost:7777');     // port numarama baglanti sagladim.

const sender = document.getElementById('sender')
const message = document.getElementById('message')
const submitBtn = document.getElementById('submitBtn')
const output = document.getElementById('output')
const feedback = document.getElementById('feedback')

submitBtn.addEventListener('click', () => {
    // chat verilerini Local Storage'a kaydet
    localStorage.setItem('chat', JSON.stringify({
        message: message.value,
        sender: sender.value
    }));
    // socket.emit ile sunucuya bir chat olayi gönderilir.
    socket.emit('chat', {
        message: message.value,
        sender: sender.value
    });
});

    socket.on('chat', data =>  {
        feedback.innerHTML = ""
        output.innerHTML += '<p><strong>' + data.sender + ': </strong>' + data.message + '</p>'

        message.value = "";

    })

    message.addEventListener("keypress", () => {
        socket.emit("typing",sender.value)
    })

    socket.on("typing",data => {
        feedback.innerHTML = '<p>' + data + ' yaziyor...</p>'
    })

    // sayfa yüklendiğinde Local Storage'dan chat verilerini al
window.onload = () => {
    const chatData = JSON.parse(localStorage.getItem('chat'));
    if (chatData) {
        sender.value = chatData.sender;
        message.value = chatData.message;
    }
};

