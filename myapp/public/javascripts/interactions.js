function GameState (session_id, ships) {
    this.session_id = session_id;
    this.ships = ships;
    this.turn = false;

    this.setTurn = function (val) {
        this.turn =  val;
    }

    this.checkIfSunk = function (ship) {
        var sunk = true;
        var shipCoordinates = ship.getCoordinates();
        for (j = 0; j < shipCoordinates.length; j++) {
            if (!shipCoordinates[j].getHit()) {
                sunk = false;
            }
        }
        if(sunk) {
            alert("SHIP SUNK");
            ship.sink();
        }
    }

    this.updateGame = function(clickedLetter) {
        console.log("your turn: " + this.turn);
   
        console.log(ships);

        var button = document.getElementById(clickedLetter)

        var row = $(button.parentElement).parent().index();
        var column = $(button.parentElement).index();
        console.log("clicked button with coordinates [" + row + "," + column + "]");
        coordinate = [row, column];
        var hit = false;

        for(i = 0; i < this.ships.array.length; i++) {
            var ship = this.ships.array[i];
            var shipCoordinates = ship.getCoordinates();
            for (j = 0; j < shipCoordinates.length; j++) {
                if (row == shipCoordinates[j].getX() && column == shipCoordinates[j].getY()) {
                    alert("HIT");
                    shipCoordinates[j].setHit(true);
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
        
        console.log(button);
        console.log('done updating');
        
    };
    
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
                    let msg = Messages.O_SHOT;
                    // msg.data = ADD WHETHER PLAYER HAS WON OR NOT
                    socket.send(JSON.stringify(msg));
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

    (function messageButton() {
        $(footer).append("<button type=\"button\" id= messageButton>Send ships</button>");
        var button = document.getElementById("messageButton");
        button.addEventListener("click", function singleClick(e) {
            let shipsMessage = Messages.O_SHIPS_SET;
            shipsMessage.data = ships;
            console.log(shipsMessage);
            socket.send(JSON.stringify(shipsMessage));
        });
    })();
    (function enableButton() {
        $(footer).append("<button type=\"button\" id= enableButton (temp until we implement yourturn messages)>Enable buttons</button>");
        var button = document.getElementById("enableButton");
        button.addEventListener("click", function singleClick(e) {
            gs.setTurn(true);
            console.log(first);
            if (first) {
                ab.initialize();
                first = false;
            }
        });

    })();

    socket.onmessage = function(event){
        let incomingMsg = JSON.parse(event.data);
        console.log("you are player " + incomingMsg.data)
        
        if(incomingMsg.type == Messages.T_PLAYER_TYPE){
            if(incomingMsg.data == "A"){
                console.log("You a player A");
                // TODO: add function show board of A
                // showBoardOfA();
                
            }
            if(incomingMsg.data == "B"){
                console.log("You are player B");
                // TODO: add function show board of A
                // showBoardOfB();

            }
        }

        if(incomingMsg.type == Messages.T_SHOOT) {
            console.log("Opponent shot");
            if(first) {
                first = false;
                ab.initialize();

            }
            gs.setTurn = true;
            
        }
    }




})(); //execute immediately