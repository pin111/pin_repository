const { Dice } = require('./dice.js');
const calculateScore = require('./calculatescore.js');
module.exports ={
 Player : class Player {
  constructor(chip) {
    this.dice_list = [];
    for (let i = 0; i < 5; i++) {
      this.dice_list.push(new Dice()); // 骰子列表
    }
    /*
    for (let dice of this.dice_list) {
        dice.diceRoll();
    }
    */
    this.score = 0; // 得分
    this.chip = chip; // 筹码
    this.state = true; // 玩家状态
    this.rank = 1; // 玩家排名
  }
  initPlayer() {

    for(let dice of this.dice_list){
      dice.initDice();
    }
    
  }
  updatePlayerState() {
    // 更新玩家状态，筹码小于等于0，状态改为False
    if (this.chip <= 0) {
      this.state = false;
    }
  }

  updateDicesState(index) {
    // 更新骰子状态{
        this.dice_list[index].updateDiceState();
  }

  dicesRoll() {
    // 摇骰子
    for (let dice of this.dice_list) {
      if (dice.getDice_state()) {
        dice.diceRoll();
      }
    }
  }

  updateChip(chip_variation) {
    // 更新筹码
    this.chip += chip_variation;
    this.updatePlayerState();
  }

  getScore() {
    // 获取玩家得分
    const dices = this.dice_list.map((dice) => dice.getDice_point());
    this.score = calculateScore(dices);
    return this.score;
  }

  getDices_state() {
    const dice_state = this.dice_list.map((dice) => dice.getDice_state());
    return dice_state
  }

  getChip() {
    // 获取玩家筹码
    return this.chip;
  }

  getDices() {
    // 获取玩家骰子点数
    const dices = this.dice_list.map((dice) => dice.getDice_point());
    return dices;
  }

  getState() {
    // 获取玩家状态
    return this.state;
  }

  updateRank(rank) {
    // 更新玩家排名
    this.rank = rank;
  }

  getRank() {
    // 获取玩家排名
    return this.rank;
  }
}
}
