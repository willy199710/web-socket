//使用插件
const express = require('express');
const SocketServer = require('ws').Server;
const PORT = 3000;

//監聽port 3000
const server = express().listen(PORT, () => console.log(`listening on port ${PORT}`));

//將 express 交給 SocketServer 開啟 WebSocket 的服務
const wss = new SocketServer({ server });

//有 Client 連線成功時
wss.on('connection', ws => {
    console.log("Client connected");

    //有 Client 傳送訊息時
    ws.on('message', data => {
        //將收到的字串轉回JSON，以便使用相關變數
        let text = JSON.parse(data);
        //取得連線中的 Client
        let clients = wss.clients;

        //發送給所有 Client
        clients.forEach(client => {
            client.send(JSON.stringify(text)); //發送給所有的 Client，一樣轉成字串
        });

        //紀錄相關資料於log查看
        console.log(text.name + " 送出 " + text.value);
    })

    ws.on('close', () => {
        console.log("Close connected");
    })
})