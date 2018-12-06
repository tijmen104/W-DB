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



});