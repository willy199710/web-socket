const express = require('express');
const SocketServer = require('ws').Server;


const PORT = 3000;

const server = express().listen(PORT, () => console.log(`listening on port ${PORT}`));

const wss = new SocketServer({ server });

wss.on('connection', ws => {
    console.log("Client connected");

    ws.on('message', data =>{
        let clients = wss.clients;

        clients.forEach(client => {
            client.send(data);
        });

        console.log("you got the message : " + data);
    })

    ws.on('close', () => {
        console.log("Close connected");
    })
})