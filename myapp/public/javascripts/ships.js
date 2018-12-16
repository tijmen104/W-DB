function Ships() {
    this.array = [];
}
Ships.prototype.addShip = function(ship) {
    this.array.push(ship);
}

function Ship(length, id) {
    this.length = length;
    this.sunk = false;
    this.id = id;
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
Ship.prototype.getId = function () {
    return this.id;
}

function Coordinate (x, y) {
    this.x = x;
    this.y = y;
    this.hit = false;

    this.setHit = function (hit) {
        this.hit = hit;
    }


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
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    
    var row = $(ev.target).parent().parent().index();
    var column = $(ev.target).parent().index();
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

        
        var updateCoordinates = function(ship) {
            if (ship.id == data) {
                var coordinates = [];
                for (i =0; i < ship.length; i++) {
                    coordinates.push(new Coordinate(row, column+i));
                }
                ship.setCoordinates(coordinates);
                console.log(ship);
            }
        }
        ships.array.forEach(updateCoordinates);
        
    }
    
    
}

var validateCoordinates = function (row, column) {
    return true; //TODO
}



var generateShips = function(ships) {
    var col = "";
    var space = 1;
    for (i = 0; i < ships.array.length; i++) {
        ship = ships.array[i];
        // TODO: it's not good how the sizes are hardcoded here
        command = "<img draggable=\"true\" ondragstart=\"drag(event)\" border=\"2\" width=\"" + ship.length*60 + "px\" height=\"50px\" src=\"images/LogoBBB.png\" class=ship id=" + ship.getId() + ">";
        col += "<td>"+ command +"</td>"; 
        space++; 
    }
    $("#shipTable").append("<tr>" + col + "</tr>");
}