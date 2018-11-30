function GameState () {
    
}

(function setUp () {
    generateBoards();
    var ships = new Ships();
    ships.addShip(new Ship(3));
    ships.addShip(new Ship(2));
    generateShips(ships);

})(); //execute immediately