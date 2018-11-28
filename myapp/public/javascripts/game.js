main = function () {
  buttons = new Square();
  generateBoard("#playerBoard");
  generateBoard("#opponentBoard");
}

Square = function (x, y) {
  this.x = x;
  this.y = y;
}
Square.prototype.getX = function() { return this.x};
Square.prototype.getY = function() { return this.y};


generateBoard = function(tableId) {
  var space = 1;
  for (var r=0; r<8; r++) {
    var col = "";
    for (var c=0; c<8; c++) { 
      var square = new Square(r,c);
      
      col += "<td data-pos='"+space+"'></td>"; space++; 
    }

    $(tableId).append("<tr>"+col+"</tr>");
  }
}


$(document).ready(main);