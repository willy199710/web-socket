# web_socket 簡易聊天室

## 成果

![IMAGE](https://github.com/willy199710/web-socket/blob/master/pic/finalresult.gif)

## Server端

```js
//server.js

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
```

## Client端

### Client 前端 View

```html
<!--index.html-->

<html>
    <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
        <script src='./index.js'></script>
        <script>
            $(document).ready(function(){
                $('#submit').click(function(e){
                    sendText($('#name').val(), $('#text').val());
                    $('#text').val("");
                }); 
            })
        </script>
    </head>
    <body>
            <div class="input-group flex gap-5 mb-3 p-2">
                <input class="form-control bg-dark-subtle" id = 'name' placeholder="請輸入名字"></input>
                <input class="form-control bg-dark-subtle" id = 'text' placeholder="輸入您想發送的訊息"></input>
            </div>
            <div class="form-floating mb-3 ">
                <textarea class="form-control" id='txtShow' style="height: 60%"disabled></textarea>
                <label for="floatingTextarea2">聊天室</label>
            </div>
            <button class="btn btn-primary" id="submit" type='submit'>送出</button>
    </body>
</html>
```

### Client端之後端 Model

```js
//index.js

//建立 WebSocket
const ws = new WebSocket('ws://localhost:3000');

//監聽連線狀態
ws.onopen = () => {
    console.log("open connection");
}

//接收 server 發過來的訊息
ws.onmessage = (event) => {
    let otherMessages = JSON.parse(event.data);
    console.log(otherMessages);
    document.getElementById('txtShow').innerHTML += otherMessages.name + " : " + otherMessages.value + "\n";
}

ws.onclose = () => {
    console.log("close connection");
}

function sendText(name, value) {
    if (!name)
        name = "匿名";
    //將送出的JSON轉成字串送出，否則為呈現[object, object]
    ws.send(JSON.stringify({
        "name" : name,
        "value" : value
    }));
}
```