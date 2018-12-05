function GameState (session_id, ships) {
    this.session_id = session_id;
    this.updateGame = function(clickedLetter) {
        //do stuff
        // var test = $(".boardButton").index("#" + clickedLetter);
        var row = $(document.getElementById(clickedLetter).parentElement).parent().index();
        var column = $(document.getElementById(clickedLetter).parentElement).index();
        console.log("clicked button with coordinates [" + row + "," + column + "]");
        coordinate = [row, column];

        for(i = 0; i < ships.array.length; i++) {
            shipCoordinates = ships.array[i].getCoordinates();
            console.log(shipCoordinates);
            for (j = 0; j < shipCoordinates.length; j++) {
                if (row == shipCoordinates[j][0] && column == shipCoordinates[j][1]) {
                    alert("HIT");
                }
            }

        }

    };
    
}

function ButtonsProcessor(gs){

    //only initialize for player that should actually be able to use the board
    this.initialize = function(){

        var elements = document.querySelectorAll(".boardButton");
        Array.from(elements).forEach( function(el){

            el.addEventListener("click", function singleClick(e){
                var clickedLetter = e.target.id;
                // new Audio("../data/click.wav").play();
                gs.updateGame(clickedLetter);

                /*
                 * every letter can only be selected once; handling this within
                 * JS is one option, here simply remove the event listener when a click happened 
                 */
                el.removeEventListener("click", singleClick, false);
            });
        });
    };
}

(function setUp () {
    generateBoards();
    var ships = new Ships();
    var ship = new Ship(3)
    ship.setCoordinates([[1,1],[1,2]]); //TODO: remove hardcoded ship coordinates
    ships.addShip(ship);
    console.log(ships.array[0])
    ships.addShip(new Ship(2));

    
    generateShips(ships);

    var gs = new GameState(1, ships);

    var ab = new ButtonsProcessor(gs);
    ab.initialize();

})(); //execute immediately