module.exports = {
  Dice: class Dice {
    constructor(){
      this.dice_point = 0;
      this.dice_state = true;
    }

    initDice() {

      this.dice_point = 0;
      this.dice_state = true;
    }
    diceRoll () {

        this.dice_point =  Math.floor(Math.random() * 6 + 1)

    }
          
    updateDiceState(){

          this.dice_state = false;

    }

    getDice_state(){
          
      return this.dice_state

    }
    getDice_point(){ 

      return this.dice_point

    }
  }
};