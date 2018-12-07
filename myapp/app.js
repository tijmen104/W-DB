var express = require("express");
var http = require("http");
var websocket = require("ws");
var game = require("./game");
var messages = require("./public/javascripts/messages");
var port = process.argv[2];
var app = express();
var indexRouter = require("./routes/index");

app.use(express.static(__dirname + "/public"));

app.get("/game",indexRouter);
app.get("/splash",indexRouter);

var server = http.createServer(app);
const wss = new websocket.Server({ server });
var websockets = {};
var gameID=0;
var currentGame = new game(gameID++);

wss.on("connection", function connection(ws) {
    
    let con  = ws;
    var playerType = currentGame.addPlayer(ws);
    let turnIsTo = "A";
    let boardSet = false;

    con.send("You are player: " + playerType);
    con.send((playerType == "A") ? messages.S_PLAYER_A : messages.S_PLAYER_B);

    if(boardSet){
        if(playerType == turnIsTo) con.send(messages.O_SHOOT);
    };

    con.on("message", function incoming(message) {
        if(message.type == T_SHIPS){
            playerType=="A"? currentGame.boardA=message.data : currentGame.boardB=message.data;
        }
    });
});

server.listen(port);