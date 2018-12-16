var game = function(gameId){
    this.id = gameId;
    this.playerA =null;
    this.playerB=null;
    this.boardSet=false;
    this.shipsA=null;
    this.shipsB=null;
};

game.prototype.addPlayer = function(ws){
    if(this.playerA==null){
        this.playerA=ws;
        return "A";
    }else if(this.playerB==null){
        this.playerB=ws;
        return "B";
    }else{
        return "This game is full";
    }
}
game.prototype.sendShipsA = function(){
    return this.shipsA;
}
game.prototype.sendShipsB = function(){
    return this.shipsB;
}
game.prototype.setBoardA=function(ships){
    this.shipsA = ships;
    if(this.shipsA!=null&&this.shipsB!=null) this.boardSet =true;
}
game.prototype.setBoardB=function(ships){
    this.shipsB = ships;
    if(this.shipsA!=null&&this.shipsB!=null) this.boardSet =true;
}
module.exports = game;