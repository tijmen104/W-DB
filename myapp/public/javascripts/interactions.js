function GameState (session_id, ships) {
    this.session_id = session_id;
    this.ships = ships;

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

function ButtonsProcessor(gs){

    //only initialize for player that should actually be able to use the board
    this.initialize = function(){

        var elements = document.querySelectorAll(".boardButton");
        Array.from(elements).forEach( function(el){

            el.addEventListener("click", function singleClick(e){
                var clickedLetter = e.target.id;
                gs.updateGame(clickedLetter);
                el.removeEventListener("click", singleClick, false);
            });
        });
    };
}

(function setUp () {
    socketSetup();
    generateBoards();
    ships = new Ships(); //global
    var ship1 = new Ship(3, "ship1");
    var ship2 = new Ship(2, "ship2");

    // ship1.setCoordinates([new Coordinate(1,1), new Coordinate(1,2)]); //TODO: remove hardcoded ship coordinates
    // ship2.setCoordinates([new Coordinate(2,1), new Coordinate(2,2)]); //TODO: remove hardcoded ship coordinates
    ships.addShip(ship1);
    ships.addShip(ship2);

    
    generateShips(ships);



    var gs = new GameState(1, ships);

    var ab = new ButtonsProcessor(gs);
    ab.initialize();

    socket.onmessage = function (event) {
        //if newgame --> zet ships neer

        //if opponenthasmoved -- > update ui hit/miss/gewonnne/ship down etc

        //if yourturn --> je mag zetten -- > stuur wat er is gezet

        // abort game
    }


})(); //execute immediately