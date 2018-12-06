var game = function(gameId){
    this.id = gameId;
    this.playerA =null;
    this.playerB=null;
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
module.exports = game;