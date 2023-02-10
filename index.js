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
