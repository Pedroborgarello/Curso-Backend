const socket = io();

socket.on('welcome', data => {
    console.log(data);
})
 // ENVIA EL MENSAJE CON SOLO PRECIONAR LA TECLA ENTER 
/*let user = document.getElementById('user');
let input = document.getElementById('message');
input.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        if (e.target.value) {
            socket.emit('message', {user: user.value, message: e.target.value});
        }
    }
})*/

function addMessage(e) {
    const message = {
        user: document.getElementById('user').value,
        message: document.getElementById('message').value
    }
    if (document.getElementById('message').value !== '') {
        socket.emit('message', message);
    }
    return false
}

socket.on('messagelog', data => {
    let div = document.getElementById('chatContainer');
    let messages = data.map(message => {
        return `<div><span class="spanUser">${message.user}: </span><span class="spanMessage">${message.message}</span></div>`
    }).join('');
    div.innerHTML = messages;
})