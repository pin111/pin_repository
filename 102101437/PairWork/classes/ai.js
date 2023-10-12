const { Dice } = require('./dice.js');
const calculateScore = require('./calculatescore.js');
class AI {
  constructor(chip) {
    this.dices = [];
    for (let i = 0; i < 5; i++) {
      this.dices.push(new Dice());
    }
    this.score = 0;
    this.chip = chip;
    this.state = true;
    this.num = 0;
    this.type = 0;
    this.player_score = 0;
    this.rank=1;
  }

  dicesRoll() {
    for (let dice of this.dices) {
      if (dice.getDice_state()) {
        dice.diceRoll();
      }
    }
  }

  getDices() {
    let dices = [];
    for (let dice of this.dices) {
      dices.push(dice.getDice_point());
    }
    return dices;
  }

  getDices_state() {
    const dice_state = this.dices.map((dice) => dice.getDice_state());
    return dice_state
  }

  judgmentType() {
    let dices = this.getDices();
    let counter = new Map([...new Set(dices)].map((x) => [x, dices.filter((y) => y === x).length]));
    let counterResult = [...counter.entries()].sort((a, b) => b[1] - a[1]);
    if (counterResult[0][1] === 1) {
      let type = this.shunZa(false);
      let point = 0;
      return [type, point];
    } else {
      if (counterResult[0][1] === 5) {
        let type = 1;
        let point = counterResult[0][0];
        return [type, point];
      } else if (counterResult[0][1] === 4) {
        let type = 3;
        let point = counterResult[0][0];
        return [type, point];
      } else if (counterResult[0][1] === 3) {
        if (counterResult[1][1] === 2) {
          let type = 5;
          let point = counterResult[0][0];
          return [type, point];
        } else {
          let type = 6;
          let point = counterResult[0][0];
          return [type, point];
        }
      } else {
        if (counterResult[1][1] === 2) {
          let type = 7;
          let point = Math.max(counterResult[0][0], counterResult[1][0]);
          return [type, point];
        } else {
          let type = this.shunZa(true);
          let point = counterResult[0][0];
          return [type, point];
        }
      }
    }
  }

  shunZa(flag) {
    let count = 1;
    let maxcount = 0;
    let dices = this.getDices();
    dices.sort((a, b) => a - b);
    for (let i = 0; i < 4; i++) {
      if (dices[i] + 1 === dices[i + 1]) {
        count += 1;
      } else if (dices[i] === dices[i + 1]) {
        continue;
      } else {
        maxcount = Math.max(maxcount, count);
        count = 1;
      }
    }
    maxcount = Math.max(maxcount, count);
    if (maxcount === 5) {
      return 2;
    } else if (maxcount === 4) {
      return 4;
    } else {
      if (flag) {
        return 8;
      } else {
        return 9;
      }
    }
  }

  getType() {
    [this.type, this.num] = this.judgmentType();
    return [this.type, this.num];
  }

  upDatePlayerScore(score) {
    this.player_score = score;
  }
  lock() {
    let [type, num] = this.getType();
  
    if (type === 1) {
      for (let dice of this.dices) {
        dice.updateDiceState();
      }
    } else if (type === 2) {
      for (let dice of this.dices) {
        dice.updateDiceState();
      }
    } else if (type === 3) {
      for (let dice of this.dices) {
        if (dice.getDice_point() === num) {
          dice.updateDiceState();
        }
      }
    } else if (type === 4) {
      let dices = this.getDices();
      dices.sort();
      let maxnum = 0;
      for (let i = 0; i < 4; i++) {
        if (dices[i] === dices[i + 1] - 1) {
          maxnum = dices[i + 1];
        }
      }
      let nums = [];
      nums.push(maxnum);
      nums.push(maxnum - 1);
      nums.push(maxnum - 2);
      nums.push(maxnum - 3);
      for (let dice of this.dices) {
        if (nums.includes(dice.getDice_point())) {
          nums.splice(nums.indexOf(dice.getDice_point()), 1);
          dice.updateDiceState();
        }
      }
    } else if (type === 5) {
      if (this.score + 20 > this.player_score) {
        for (let dice of this.dices) {
          dice.updateDiceState();
        }
      } else {
        for (let dice of this.dices) {
          if (dice.getDice_point() === num) {
            dice.updateDiceState();
          }
        }
      }
    } else if (type === 6) {
      for (let dice of this.dices) {
        if (dice.getDice_point() === num) {
          dice.updateDiceState();
        }
      }
    } else if (type === 7) {
      let dices = this.getDices();
      dices.sort((a, b) => b - a);
      let nums = [];
      for(let i=0;i<dices.length;i++){
        if (dices[i] === dices[i+1]){
          nums.push(dices[i]);
        }
      }
      if (this.score + 20 > this.player_score) {
        for (let dice of this.dices) {
          if (nums.includes(dice.getDice_point())) {
            dice.updateDiceState();
          }
        }
      } else {
        for (let dice of this.dices) {
          if (dice.getDice_point() === num) {
            dice.updateDiceState();
          }
        }
      }
    } else if (type === 8) {
      let count = 1;
      let maxcount = 0;
      let maxnum = 0;
      let maxi = 0;
      let dices = this.getDices();
      dices.sort();
      for (let i = 0; i < 4; i++) {
        if (dices[i] + 1 === dices[i + 1]) {
          count += 1;
          maxnum = dices[i + 1];
        } else if (dices[i] !== dices[i + 1]) {
          maxcount = Math.max(maxcount, count);
          count = 1;
        }
        maxcount = Math.max(maxcount, count);
      }
      let nums = [];
  
      if (maxcount === 3) {
        nums.push(maxnum);
        nums.push(maxnum - 1);
        nums.push(maxnum - 2);
        for (let dice of this.dices) {
          if (nums.includes(dice.getDice_point())) {
            nums.splice(nums.indexOf(dice.getDice_point()), 1);
            dice.updateDiceState();
          }
        }
      } else {
        if (!dices.includes(3) && !dices.includes(4)) {
          if (num === 5 || num === 6) {
            for (let dice of this.dices) {
              if (dice.getDice_point() === num) {
                dice.updateDiceState();
              }
            }
          }
        } else {
          for (let i = 0; i < 4; i++) {
            if (dices[i] + 1 === dices[i + 1]) {
              maxnum = dices[i + 1];
              maxi = i + 1;
            }
          }
          if (maxi === 4) {
            nums.push(dices[4]);
            nums.push(dices[3]);
            nums.push(dices[2]);
          } else if (maxi === 2) {
            nums.push(dices[0]);
            nums.push(dices[1]);
            nums.push(dices[2]);
          } else {
            if (dices[maxi]+2 == dices[maxi+1]){
              nums.push(dices[maxi-1]);
              nums.push(dices[maxi]);
              nums.push(dices[maxi+1]);
            }
            else{
              nums.push(dices[maxi]);
              nums.push(dices[maxi-1]);
              nums.push(dices[maxi-2]);
            }
          }
            for (let dice of this.dices) {
              if (nums.includes(dice.getDice_point())) {
                nums.splice(nums.indexOf(dice.getDice_point()), 1);
                dice.updateDiceState();
              }
            }
          }
        }
      }
        else {
            let dices = this.getDices();
            if (dices.includes(4)) {
              let nums = [4, 5, 6];
              for (let dice of this.dices) {
                if (nums.includes(dice.getDice_point())) {
                  dice.updateDiceState();
                }
              }
            } else {
              let nums = [1, 2, 3];
              for (let dice of this.dices) {
                if (nums.includes(dice.getDice_point())) {
                  dice.updateDiceState();
                }
              }
            }
          }
        }
        selectRate() {
          if (this.score > this.player_score + 40) {
            return 3;
          } else if (this.player_score + 40 > this.score && this.score > this.player_score + 20) {
            return 2;
          } else if (this.player_score + 20 > this.score && this.score > this.player_score) {
            return 1;
          } else {
            return 0;
          }
        }
        
        updateChip(chip_variation) {
          this.chip += chip_variation;
          this.updatePlayerState();
        }
        
        getScore() {
          const dices = this.dices.map((dice) => dice.getDice_point());
          this.score = calculateScore(dices);
          return this.score;
        }
        
        getChip() {
          return this.chip;
        }
        
        updatePlayerState() {
          if (this.chip <= 0) {
            this.state = false;
          }
        }
        getState() {
          // 获取游戏状态
          return this.state;
        }
        updateRank(rank) {
          this.rank = rank;
        }
      
        getRank() {
          return this.rank;
        }
        initPlayer() {

          for(let dice of this.dices){
            dice.initDice();
          }
          
        }
}
module.exports = AI;