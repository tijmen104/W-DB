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
        //do stuff
        // var test = $(".boardButton").index("#" + clickedLetter);
        var row = $(document.getElementById(clickedLetter).parentElement).parent().index();
        var column = $(document.getElementById(clickedLetter).parentElement).index();
        console.log("clicked button with coordinates [" + row + "," + column + "]");
        coordinate = [row, column];

        for(i = 0; i < this.ships.array.length; i++) {
            var ship = this.ships.array[i];
            var shipCoordinates = ship.getCoordinates();
            for (j = 0; j < shipCoordinates.length; j++) {
                if (row == shipCoordinates[j].getX() && column == shipCoordinates[j].getY()) {
                    alert("HIT");
                    shipCoordinates[j].setHit(true);
                    this.checkIfSunk(ship);
                }
            }

        }
        console.log('ships: ' + this.ships.array[0].getCoordinates()[0].getHit());
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
    generateBoards();
    var ships = new Ships();
    var ship1 = new Ship(3);
    ship1.setCoordinates([new Coordinate(1,1), new Coordinate(1,2)]); //TODO: remove hardcoded ship coordinates
    var ship2 = new Ship(2);
    ship2.setCoordinates([new Coordinate(2,1), new Coordinate(2,2)]); //TODO: remove hardcoded ship coordinates
    ships.addShip(ship1);
    ships.addShip(ship2);

    
    generateShips(ships);

    var gs = new GameState(1, ships);

    var ab = new ButtonsProcessor(gs);
    ab.initialize();

})(); //execute immediately