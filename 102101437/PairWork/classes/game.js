const { Player } = require('./player.js');
class Game {
  constructor(playerNum, chip, gamenum) {
    this.playerNum = playerNum; // 玩家人数
    this.players = []; // 玩家列表
    for (let i = 0; i < playerNum; i++) {
      this.players.push(new Player(chip));
    }
    this.magnification = 1; // 游戏倍率
    this.state = true; // 游戏状态
    this.scores = [];
    this.ranks = [];
    this.gamenum = gamenum;
  }

  getRanks(){
    const chips = this.players.map((player) => player.getChip());
    const sorted_chips = chips.slice().sort(function(a, b) {
      return b - a;
    });
    this.ranks = chips.map(function(value) {
      var rank = sorted_chips.indexOf(value) + 1;
      return rank;
    });
    return this.ranks;
  }

  updateGame(){
    for(let player of this.players){
      player.initPlayer();
    }
  }
  getPlayers(){
    return this.players;
  }
  
  updateMagnification(magnification) {
    // 更新游戏倍率
    this.magnification += magnification;
  }

  getScores() {
    this.scores = this.players.map((player) => player.getScore());
    return this.scores;
  }

  updatePlayerChip(score, maxScoreIndex) {
    // 一局游戏结束后，更新玩家筹码
    for (let i = 0; i < score.length; i++) {
      if (i === maxScoreIndex) {
        continue;
      }
      const chip = (score[maxScoreIndex] - score[i]) * this.magnification;
      this.players[i].updateChip(-chip);
      this.players[maxScoreIndex].updateChip(chip);
    }
  }

  getState() {
    // 获取游戏状态
    return this.state;
  }

  updateState() {
    // 更新游戏状态
    for (const player of this.players) {
      if (player.getChip() <= 0) {
        this.state = false;
        break;
      }
    }
  }
  getPlayersDices(){

    const players_dices = this.players.map((player) => player.getDices());
    return players_dices;
  }
  

  getMagnification() {
    // 获取游戏倍率
    return this.magnification;
  }

  

  getChips() {
    //打印筹码
    const chips = this.players.map((player) => player.getChip());
    return chips
  }

  

  
}

module.exports = Game;