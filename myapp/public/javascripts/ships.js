function Ships() {
    this.array = [];
}
Ships.prototype.addShip = function(ship) {
    this.array.push(ship);
}

function Ship(length) {
    this.length = length;
    this.sunk = false;
}
Ship.prototype.setCoordinates = function (coordinates) {
    this.coordinates = coordinates;
}
Ship.prototype.getCoordinates = function () {
    return this.coordinates;
}
Ship.prototype.sink = function () {
    this.sunk = true;
}

function Coordinate (x, y) {
    this.x = x;
    this.y = y;
    this.hit = false;
}
Coordinate.prototype.setHit = function (hit) {
    this.hit = hit;
}
Coordinate.prototype.getX = function () {
    return this.x;
}
Coordinate.prototype.getY = function () {
    return this.y;
}
Coordinate.prototype.getHit = function () {
    return this.hit;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setData("sourcePlaceHolderId", ev.target.parentElement.firstChild.id)
    // ev.target.parentElement.
    // var placeHolder = ev.target.parentElement.firstChild




}

var validateCoordinates = function (row, column) {
    return true; //TODO
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    
    var row = $(ev.target).parent().index();
    var column = $(ev.target).parent().parent().index();
    console.log("Dropped front of ship on coordinates [" + row + "," + column + "]");
    if (validateCoordinates(row, column)) {
        ev.target.parentElement.appendChild(document.getElementById(data));
        ev.target.style.height = "0px";
        ev.target.style.width = "0px";
    
        var sourcePlaceHolderId = ev.dataTransfer.getData("sourcePlaceHolderId");
        var placeHolder = document.getElementById(sourcePlaceHolderId);
        if (placeHolder.className.valueOf() == "playerBoardPlaceHolder") {
           
            placeHolder.style.width = "100%";
            placeHolder.style.height = "100%";
            console.log("reset size of placeholder");
        }
    }
    
    
}

var generateShips = function(ships) {
    var col = "";
    var space = 1;
    for (i = 0; i < ships.array.length; i++) {
        ship = ships.array[i];
        // TODO: it's not good how the sizes are hardcoded here
        command = "<img draggable=\"true\" ondragstart=\"drag(event)\" border=\"2\" width=\"" + ship.length*60 + "px\" height=\"50px\" src=\"images/LogoBBB.png\" class=ship id=ship"+ ship.length*60;
        col += "<td>"+ command +"</td>"; 
        space++; 
    }
    $("#shipTable").append("<tr>" + col + "</tr>");
}