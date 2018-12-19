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
    res.render("splash.ejs", {gamesInitialized: gameID-1, visits: req.cookies.visits, total: totalTime,average:averageTime});

});

var server = http.createServer(app);
const wss = new websocket.Server({ server });
var websockets = {};
var gameID=0;
var currentGame = new game(gameID++);
var shipsPlaced = null;
var gamesFinished=0;
var averageTime = 0;
var totalTime=0;

wss.on("connection", function connection(ws) {
    
    let con  = ws;
    con.id = currentGame.id;
    websockets[con.id] = currentGame;

    var playerType = currentGame.addPlayer(ws);
    if(playerType == "B") {
        currentGame.playerA.send(messages.S_PLACE);
        currentGame.playerB.send(messages.S_PLACE);
        currentGame = new game(gameID++);
    }

    con.send((playerType == "A") ? messages.S_PLAYER_A : messages.S_PLAYER_B);

    boardCheck = function(game){
        if(game.boardSet){
            game.playerA.send(messages.S_GAME_STARTED);
            game.playerB.send(messages.S_GAME_STARTED);
            game.playerA.send(messages.S_SHOOT);
        }
    }

    con.on("message", function incoming(message) {
        let oMsg = JSON.parse(message);
        let gameObj = websockets[con.id];

        if(oMsg.type == messages.T_SHIPS){
            if(playerType=="A"){
                gameObj.setBoardA(oMsg.data);
                boardCheck(gameObj);
                gameObj.playerB.send(message);
            } else{ 
                gameObj.setBoardB(oMsg.data);
                boardCheck(gameObj);
                gameObj.playerA.send(message);
            }
        }
        if(oMsg.type == messages.T_MOVE_MADE){
            let messageOut = messages.O_SHOOT;
            messageOut.data = oMsg.data;
            let stringMsg = JSON.stringify(messageOut);
            (playerType=="A")? gameObj.playerB.send(stringMsg):gameObj.playerA.send(stringMsg);
        }
        if(oMsg.type == messages.T_GAME_ENDED){
            (playerType=="A")? gameObj.playerB.send(messages.S_GAME_ENDED):gameObj.playerA.send(messages.S_GAME_ENDED);
            console.log(oMsg.data);
            let time = oMsg.data;
            totalTime+=time;
            gamesFinished++;
            averageTime=totalTime/gamesFinished;
        }
    });
    con.on("close", function(code){
        console.log(con.id + "disconnected");
        let gameObj = websockets[con.id];

        try{
            gameObj.playerA.send(messages.S_GAME_ABORTED);
            gameObj.playerA.close();
            gameObj.playerA=null;
        }catch(err){
            console.log("Player A already disconnected");
        }
        try{
            gameObj.playerB.send(messages.S_GAME_ABORTED);
            gameObj.playerB.close();
            gameObj.playerB = null;
        }
        catch(err){
            console.log("Player B already disconnected");
        }
    });
});

server.listen(port);