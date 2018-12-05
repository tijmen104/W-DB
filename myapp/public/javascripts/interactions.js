function GameState (session_id) {
    this.session_id = session_id;
    this.updateGame = function(clickedLetter) {
        //do stuff
        alert("update game");
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
    ships.addShip(new Ship(3));
    ships.addShip(new Ship(2));
    generateShips(ships);

    var gs = new GameState(1);

    var ab = new ButtonsProcessor(gs);
    ab.initialize();

})(); //execute immediately