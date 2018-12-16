function GameState (session_id, ships) {
    this.session_id = session_id;
    this.ships = ships;
    this.turn = false;
    this.opponentShips = null;

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
        coordinate = [row, column];
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
                    gs.updateGame(clickedLetter);
                    el.removeEventListener("click", singleClick, false);
                    gs.setTurn(false);
                    let msg;
                    if(gs.checkIfWon()) {
                        msg = Messages.O_GAME_ENDED;

                    } else {
                        msg = Messages.O_MOVE_MADE;
                    }
                    socket.send(JSON.stringify(msg));
                    //TODO: meegeven waar je hebt geschoten (en of het raak was)
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
    // var ship1 = new Ship(5, "ship1");
    // var ship2 = new Ship(4, "ship2");
    // var ship3 = new Ship(3, "ship3");
    // var ship4 = new Ship(3, "ship4");
    var ship5 = new Ship(2, "ship5");
    // ships.addShip(ship1);
    // ships.addShip(ship2);
    // ships.addShip(ship3);
    // ships.addShip(ship4);
    ships.addShip(ship5);
    generateShips(ships);





    var gs = new GameState(1, ships);

    var ab = new ButtonsProcessor(gs, socket);
    
    var first= true;

    (function messageButton() {
        $(footer).append("<button type=\"button\" id= messageButton>Ready!</button>");
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

        });
        
    })();
    // (function enableButton() {
    //     $(footer).append("<button type=\"button\" id= enableButton (temp until we implement yourturn messages)>Enable buttons</button>");
    //     var button = document.getElementById("enableButton");
    //     button.addEventListener("click", function singleClick(e) {
    //         gs.setTurn(true);
    //         console.log(first);
    //         if (first) {
    //             ab.initialize();
    //             first = false;
    //         }
    //     });

    // })();

    socket.onmessage = function(event){
        let incomingMsg = JSON.parse(event.data);
        console.log("message type: " + incomingMsg.type);
        
        if(incomingMsg.type == Messages.T_PLAYER_TYPE){
            console.log("You are player " + incomingMsg.data);
        }

        if(incomingMsg.type == Messages.T_SHOOT) {
            gs.setTurn(true);
            
        }


        if(incomingMsg.type == Messages.T_SHIPS){
            opponentShips = incomingMsg.data;
            gs.setOpponentShips(opponentShips);

        }

        if(incomingMsg.type == Messages.T_GAME_STARTED) {
            first = false;
            ab.initialize();
        }

        if(incomingMsg.type == Messages.T_GAME_ENDED) {
            alert("YOU LOST");
            gs.setTurn(false);
        }
    }




})(); //execute immediately