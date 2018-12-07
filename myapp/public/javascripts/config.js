function socketSetup(){
var socket = new WebSocket("ws://localhost:3000");
socket.onmessage = function(event){
    let incomingMsg = JSON.parse(event.data);

    if(incomingMsg.type == Messages.T_PLAYER_TYPE){
        if(incomingMsg.data == "A"){
            // TODO: add function show board of A
            showBoardOfA();
            
        }
        if(incomingMsg.data == "B"){
            // TODO: add function show board of A
            showBoardOfB();

        }
    }
}

let msg = Message.O_SHIPS;
// TODO JSON ship
msg.data = null;

socket.send(msg);

};