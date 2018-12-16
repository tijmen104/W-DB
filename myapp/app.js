var express = require("express");
var http = require("http");
var websocket = require("ws");
var game = require("./game");
var messages = require("./public/javascripts/messages");
var port = process.argv[2];
var app = express();
var indexRouter = require("./routes/index");
var cookies = require("cookie-parser");

app.use(express.static(__dirname + "/public"));
app.use(cookies("doesn't matter"));

app.get("/game",indexRouter);
app.get("/splash",indexRouter);

app.get("/", (req, res) => {
    console.log(req.cookies);
    if (!req.cookies.visits) {
        req.cookies.visits = 0;
    }
    res.cookie("visits", ++req.cookies.visits);
    res.render("splash.ejs", {gamesInitialized: 9999999999, visits: req.cookies.visits});

});

var server = http.createServer(app);
const wss = new websocket.Server({ server });
var websockets = {};
var gameID=0;
var currentGame = new game(gameID++);

wss.on("connection", function connection(ws) {
    
    let con  = ws;
    var playerType = currentGame.addPlayer(ws);

    con.send("You are player: " + playerType);
    con.send((playerType == "A") ? messages.S_PLAYER_A : messages.S_PLAYER_B);

    boardCheck = function(){
        if(currentGame.boardSet){
            currentGame.playerA.send(messages.S_GAME_STARTED);
            currentGame.playerB.send(messages.S_GAME_STARTED);
            currentGame.playerA.send(messages.S_SHOOT);
        }
    }
    con.on("message", function incoming(message) {
        let oMsg = JSON.parse(message);

        if(oMsg.type == messages.T_SHIPS){
            console.log("Ships received");
            if(playerType=="A"){
                currentGame.setBoardA(oMsg.data);
                boardCheck();
                currentGame.playerB.send(message);
            } else{ 
                currentGame.setBoardB(oMsg.data);
                boardCheck();
                currentGame.playerA.send(message);
            }
        }
        if(oMsg.type == messages.T_MOVE_MADE){
            (playerType=="A")? currentGame.playerB.send(messages.S_SHOOT):currentGame.playerA.send(messages.S_SHOOT);
        }
        if(oMsg.type == messages.T_GAME_ENDED){
            (playerType=="A")? currentGame.playerB.send(messages.S_GAME_ENDED):currentGame.playerA.send(messages.S_GAME_ENDED);
        }
    });
});

server.listen(port);