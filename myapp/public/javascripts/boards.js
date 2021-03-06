var generateBoards = function() {
  buttons = new Square();
  generatePlayerBoard("#playerBoard");
  generateOpponentBoard("#opponentBoard");
}

Square = function (x, y, buttonID) {
  this.x = x;
  this.y = y;
  this.buttonID = buttonID;
}
Square.prototype.getX = function() { return this.x};
Square.prototype.getY = function() { return this.y};
Square.prototype.getButtonID = function() { return this.buttonID};


generateOpponentBoard = function(tableId) {
  var space = 1;
  var id = 0;
  for (var r=0; r<boardSize; r++) {
    var col = "";
    for (var c=0; c<boardSize; c++) { 
      var square = new Square(r,c, id);
      var buttonTemplate = "<button type=\"button\" class=boardButton id=opponentButton" + id + "></button>";
      col += "<td data-pos='"+space+"'>"+ buttonTemplate +"</td>"; space++; 
      id++;
    }

    $(tableId).append("<tr>"+col+"</tr>");
  }
  
}

generatePlayerBoard = function(tableId) {
  var space = 1;
  var id = 0;
  for (var r=0; r<boardSize; r++) {
    var col = "";
    for (var c=0; c<boardSize; c++) { 
      var square = new Square(r,c, id);
      var buttonTemplate = "<div class=playerBoardPlaceHolder ondrop=\"drop(event)\" ondragover=\"allowDrop(event)\" id=boardElement" + id + "></div>";
      col += "<td class= rowBoard data-pos='"+space+"'>"+ buttonTemplate +"</td>"; space++; 
      id++;
    }

    $(tableId).append("<tr>"+col+"</tr>");
  }
  
}

updatePlayerBoard = function(coordinate, ships) {
  if(coordinate) {
    let row = coordinate.row;
    let column = coordinate.column;
    let color;
    if(coordinate.hit) {
      color = "red";
    } else {
      color = "blue";
    }
    
    $("#playerBoard tr:nth-of-type(" + (row + 1) + ")" +  " td:nth-of-type(" + (column + 1) + ")").css("background-color", color);
  }


}