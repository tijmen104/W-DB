function Ships() {
    this.array = [];
}
Ships.prototype.addShip = function(ship) {
    this.array.push(ship);
}

function Ship(length) {
    this.length = length;
}
Ship.prototype.setCoordinates = function (coordinates) {
    this.coordinates = coordinates;
}

var generateShips = function(ships) {
    var col = "";
    var space = 1;
    for (i = 0; i < ships.array.length; i++) {
        ship = ships.array[i];
        // TODO: it's not good how the sizes are hardcoded here
        command = "<img draggable=\"true\" border=\"2\" width=\"" + ship.length*60 + "\" height=\"60\"";
        col += "<tr data-pos='"+space+"'><td>"+ command +"</td></tr>"; 
        space++; 
    }
    $("#shipTable").append(col);
}