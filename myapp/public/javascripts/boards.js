var generateBoards = function() {
  buttons = new Square();
  generateBoard("#playerBoard");
  generateBoard("#opponentBoard");
}

Square = function (x, y, buttonID) {
  this.x = x;
  this.y = y;
  this.buttonID = buttonID;
}
Square.prototype.getX = function() { return this.x};
Square.prototype.getY = function() { return this.y};
Square.prototype.getButtonID = function() { return this.buttonID};


generateBoard = function(tableId) {
  var space = 1;
  var id = 0;
  for (var r=0; r<boardSize; r++) {
    var col = "";
    for (var c=0; c<boardSize; c++) { 
      var square = new Square(r,c, id);
      var buttonTemplate = "<button type=\"button\" class=boardButton ondrop=\"drop(event)\" ondragover=\"allowDrop(event)\" id=b" + id + "></button>"
      col += "<td class=rowBoard data-pos='"+space+"'>"+ buttonTemplate +"</td>"; space++; 
      id++;
    }

    $(tableId).append("<tr>"+col+"</tr>");
  }
  
}