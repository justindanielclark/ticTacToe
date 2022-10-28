const PlayerCreator = (()=>{
  function Player(name, team, AiDifficulty){
    this.name = name;
    this.team = team;
    this.AiDifficulty = AiDifficulty;
    this.wins = 0;
    this.loses = 0;
  }
  Player.prototype = {
    incrementWins: function(){
      this.wins++;
    },
    incrementLoses: function(){
      this.loses++;
    }
  }
  return Player;
})()

export default PlayerCreator;