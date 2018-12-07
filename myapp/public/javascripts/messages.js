(function(exports){
    /*
    * server to client: your turn to shoot
    */
   exports.T_SHOOT = {
       type: "Your-turn"
   };
   exports.O_SHOOT = JSON.stringify(exports.T_SHOOT);

   /*
   * Server to client: Game started
   */
  exports.T_GAME_STARTED = {
      type: "GAME-STARTED"
  };
  exports.O_GAME_STARTED = JSON.stringify(exports.T_GAME_STARTED);
  /*
  * Client to server: move made
  */
 exports.T_MOVE_MADE ="MOVE-MADE";
 exports.O_MOVE_MADE ={
    type: exports.T_MOVE_MADE,
    data:null
 };

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
     * Client to server: set board
     */
    exports.T_SHIPS = "SHIPS";
    exports.O_SHIPS ={
        type: exports.T_BOARD,
        data: null
    };


}(typeof exports === "undefined" ? this.Messages = {} : exports)); 