(function(exports){
    /*
     * Server to client: set as player A 
     */
    exports.T_PLAYER_TYPE = "PLAYER-TYPE";
    exports.O_PLAYER_A = {                            
        type: exports.T_PLAYER_TYPE,
        data: "A"
    };
    exports.S_PLAYER_A = JSON.stringify(exports.O_PLAYER_A);

    /* 
     * Server to client: set as player B 
     */
    exports.O_PLAYER_B = {                            
        type: exports.T_PLAYER_TYPE,
        data: "B"
    };
    exports.S_PLAYER_B = JSON.stringify(exports.O_PLAYER_B);

    /**
     * Server to client: set ships
     */
    exports.T_PLAYERS_CONNECTED= "PLAYERS-CONNECTED";
    exports.O_PLAYERS_CONNECTED= {
        type: exports.T_PLAYERS_CONNECTED
    };

    exports.S_PLAYERS_CONNECTED = JSON.stringify(exports.O_PLAYERS_CONNECTED);

    /**
     * Client to server: I set board
     */
    exports.T_SHIPS = "SHIPS";
    exports.O_SHIPS_SET ={
        type: exports.T_SHIPS,
        data: null
    };
    /**
     * Server to client: board set 
     */
    exports.S_SHIPS_SET = JSON.stringify(exports.O_SHIPS_SET);
    /*
   * Server to client: Game started
   */
    exports.T_GAME_STARTED = "GAME-STARTED";
    exports.O_GAME_STARTED = {
        type: exports.T_GAME_STARTED
    }
    exports.S_GAME_STARTED = JSON.stringify(exports.O_GAME_STARTED);
    /*
    * server to client: your turn to shoot
    */
   exports.T_SHOOT = "Your-turn";
   exports.O_SHOOT = {
       type: exports.T_SHOOT
   }
   exports.S_SHOOT = JSON.stringify(exports.O_SHOOT);

  
  /*
  * Client to server: move made
  */
 exports.T_MOVE_MADE ="MOVE-MADE";
 exports.O_MOVE_MADE ={
    type: exports.T_MOVE_MADE,
    data:null
 };
 /**
  * Client to server: game ended;
  */
 exports.T_GAME_ENDED = "GAME-ENDED";
 exports.O_GAME_ENDED = {
    type: exports.T_GAME_ENDED,
    data: null
 };
exports.S_GAME_ENDED = JSON.stringify(O_GAME_ENDED);

}(typeof exports === "undefined" ? this.Messages = {} : exports)); 