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

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log(ev.target.parentElement);
    
    ev.target.parentElement.appendChild(document.getElementById(data));
    ev.target.remove();
}

var generateShips = function(ships) {
    var col = "";
    var space = 1;
    for (i = 0; i < ships.array.length; i++) {
        ship = ships.array[i];
        // TODO: it's not good how the sizes are hardcoded here
        command = "<img draggable=\"true\" ondragstart=\"drag(event)\" border=\"2\" width=\"" + ship.length*60 + "px\" height=\"50px\" src=\"images/LogoBBB.png\" class=ship id=ship"+ ship.length*60;
        col += "<tr data-pos='"+space+"'><td>"+ command +"</td></tr>"; 
        space++; 
    }
    $("#shipTable").append(col);
}