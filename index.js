const ws = new WebSocket('ws://localhost:3000');

ws.onopen = () => {
    console.log("open connection");
}

ws.onmessage = (event) => {
    console.log(event);
}

ws.onclose = () => {
    console.log("close connection");
}