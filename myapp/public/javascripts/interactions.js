function GameState (session_id, ships) {
    this.session_id = session_id;
    this.ships = ships;
    this.turn = false;
    this.opponentShips = null;
    this.shotsFired=0;

    this.setTurn = function (val) {
        this.turn =  val;
    }

    this.setOpponentShips = function (opShips) {
        this.opponentShips = opShips;
    }

    this.checkIfSunk = function (ship) {
        var sunk = true;
        var shipCoordinates = ship.coordinates;
        for (j = 0; j < shipCoordinates.length; j++) {
            if (!shipCoordinates[j].hit) {
                sunk = false;
            }
        }
        if(sunk) {
            alert("SHIP SUNK");
            ship.sunk = true;
        }
    }

    this.updateGame = function(clickedLetter) {
   
        var button = document.getElementById(clickedLetter)

        var row = $(button.parentElement).parent().index();
        var column = $(button.parentElement).index();
        console.log("clicked button with coordinates [" + row + "," + column + "]");
        coordinate = {row : row, column: column};
        var hit = false;

        for(i = 0; i < this.opponentShips.array.length; i++) {
            var ship = this.opponentShips.array[i];
            var shipCoordinates = ship.coordinates;
            for (j = 0; j < shipCoordinates.length; j++) {
                if (row == shipCoordinates[j].x && column == shipCoordinates[j].y) {
                    alert("HIT");
                    shipCoordinates[j].hit = true;
                    this.checkIfSunk(ship);
                    hit = true;
                }
            }
        }
        if (hit) {
            console.log(button.className);
           button.className += " hit";
        } else {
            button.className += " missed";
        }
        coordinate.hit = hit;
        return coordinate;
    };

    this.checkIfWon = function() {
        won = true;
        this.opponentShips.array.forEach(function(element) {
            if(!element.sunk) {
                won = false;
            }
        })
        return won;
    }
    
}

function ButtonsProcessor(gs, socket){

    //only initialize for player that should actually be able to use the board
    this.initialize = function(){

        var elements = document.querySelectorAll(".boardButton");
        Array.from(elements).forEach( function(el){

            el.addEventListener("click", function singleClick(e){
                if (gs.turn) {
                    var clickedLetter = e.target.id;
                    var coordinate = gs.updateGame(clickedLetter);
                    el.removeEventListener("click", singleClick, false);
                    gs.setTurn(false);
                    let msg;
                    if(gs.checkIfWon()) {
                        alert("you won!");
                        msg = Messages.O_GAME_ENDED;
                        msg.data = totalSeconds;
                        alert("You won!");          
                    } else {
                        msg = Messages.O_MOVE_MADE;
                        var shots = document.getElementById("shotsFired");
                        gs.shotsFired++;
                        shots.innerHTML = gs.shotsFired;
                        msg.data = coordinate; 
                    }
                    socket.send(JSON.stringify(msg));
                    $("#yourTurn").remove();
                    setTimeout(function () {
                        new Audio("../data/gun.wav").play();
                    }, 200);
                }

            });
        });
    };
}

(function setUp () {
    // socketSetup();
    var socket = new WebSocket("ws://localhost:3000");

    generateBoards();

    ships = new Ships(); //global
    var ship1 = new Ship(5, "ship1");
    var ship2 = new Ship(4, "ship2");
    var ship3 = new Ship(3, "ship3");
    var ship4 = new Ship(3, "ship4");
    var ship5 = new Ship(2, "ship5");
    ships.addShip(ship1);
    ships.addShip(ship2);
    ships.addShip(ship3);
    ships.addShip(ship4);
    ships.addShip(ship5);
    generateShips(ships);





    var gs = new GameState(1, ships);

    var ab = new ButtonsProcessor(gs, socket);
    
    var first= true;
    $('#fs-toggle').click(function(){
    let board = $('#opponentBoard')[0];
    board.requestFullscreen();
    });

    

    function messageButton() {
        $("#gameHeader").append("<div><button class=standardButton type=\"button\" id= messageButton>Ready!</button></div>");
        var button = document.getElementById("messageButton");
        button.addEventListener("click", function singleClick(e) {
            let shipsMessage = Messages.O_SHIPS_SET;
            shipsMessage.data = ships;
            socket.send(JSON.stringify(shipsMessage));
            
            $(".ship").each( function(index) {
                $(this).attr("draggable", "false");
            });

            button.removeEventListener("click", singleClick, false);
            button.remove();
            processShips(ships);
            $("#gameHeader").append("<div class=\"waiting standardButton\" id = waiting>Waiting for other player</div>");

        });
        
    };
    function yourTurn(){
        $("#gameHeader").append("<div><button class=standardButton type=\"button\" id= yourTurn>Your turn!</button></div>");
    }

    socket.onmessage = function(event){
        let incomingMsg = JSON.parse(event.data);
        console.log("message type: " + incomingMsg.type);
        
        if(incomingMsg.type == Messages.T_PLAYER_TYPE){
            console.log("You are player " + incomingMsg.data);
        }

        if(incomingMsg.type == Messages.T_SHOOT) {
            gs.setTurn(true);
            yourTurn();
            console.table(incomingMsg.data);
            updatePlayerBoard(incomingMsg.data, gs.ships);
            
        }

        if(incomingMsg.type == Messages.T_SHIPS){
            opponentShips = incomingMsg.data;
            gs.setOpponentShips(opponentShips);
        }

        if(incomingMsg.type == Messages.T_GAME_STARTED) {
            $("#waiting").remove();
            first = false;
            ab.initialize();
            counter();
        }

        if(incomingMsg.type == Messages.T_GAME_ENDED) {
            alert("YOU LOST");
            gs.setTurn(false);
        }

        if(incomingMsg.type == Messages.T_PLACE) {
            $("#waitingforjoin").remove();
            messageButton();
        }
        if(incomingMsg.type == Messages.T_GAME_ABORTED){
            alert("Other player aborted game");
        }
    }

    function counter(){
        var minutesLabel = document.getElementById("minutes");
        var secondsLabel = document.getElementById("seconds");
        totalSeconds = 0;
        setInterval(setTime, 1000);

        function setTime() {
        ++totalSeconds;
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
        }

        function pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
        };
    }
    
})(); //execute immediately