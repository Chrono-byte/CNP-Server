const http = require('http');
const fs = require('fs');
const io = require('socket.io');
const url = require('url');

const server = http.createServer((request, response) => {});

function genToken(length, chars) {
    let result = '';
    let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

const port = 8080;
server.listen(port, (err) => {
    if (err) {
        console.log('ERROR:', err);
        return;
    }
    console.log(`server is listening on ${port}`);
});

let listener = io.listen(server);

listener.on('connection', (socket) => {
    socket.on('ask', (request) => { // Client asks for something from server
        if (!request.data) return;
        let response = null;
        switch (request.data.type) {
            case 'token':
                break;
        }
    });

    socket.on('post', (request) => { // Sever posts something to client

    });

    socket.on('send', (request) => { // Client sends something to server
        if (!request.data) return;
        let response = null;
        switch (request.data.type) {
            case 'message':
                response = request;
                break;
            default:
                response = {
                    for: request.for,
                    error: {
                        status: '405 Method Not Allowed',
                        title: 'Unknown data type in request'
                    }
                }
                console.log('ERROR: 405 Method Not Allowed')
        }
        socket.emit('post', response)
        console.log(response)
    });
});