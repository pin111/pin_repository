function shunZa(dice_list) {
  let count = 1;
  let maxcount = 0;
  dice_list.sort((a, b) => a - b);
  for (let i = 0; i < 4; i++) {
    if (dice_list[i] + 1 === dice_list[i + 1]) {
      count += 1;
    }
    else if (dice_list[i] === dice_list[i+1])
      continue;
    else {
      maxcount = Math.max(maxcount, count);
      count = 1;
    }
  }
  maxcount = Math.max(maxcount, count);
  let bonus_point = 0;
  if (maxcount === 5) {
    bonus_point = 60;
  } else if (maxcount === 4) {
    bonus_point = 30;
  }
  return bonus_point;
}

function bonusPoint(dice_list) {
  const counter = dice_list.reduce((acc, curr) => {
    acc[curr] = acc[curr] ? acc[curr] + 1 : 1;
    return acc;
  }, {});

  const counter_resuly = Object.entries(counter).sort((a, b) => b[1] - a[1]);

  let bonus_point = 0;
  if (counter_resuly[0][1] === 1) {
    bonus_point = shunZa(dice_list);
  } else {
    if (counter_resuly[0][1] === 5  ) {
      if (counter_resuly[0][0] === "0")
        bonus_point=0;
      else
        bonus_point = 100;
    } else if (counter_resuly[0][1] === 4) {
      bonus_point = 40;
    } else if (counter_resuly[0][1] === 3) {
      if (counter_resuly[1][1] === 2) {
        bonus_point = 20;
      } else {
        bonus_point = 10;
      }
    } else {
      if (counter_resuly[1][1] === 2) {
        bonus_point = 10;
      } else {
        bonus_point = shunZa(dice_list);
      }
    }
  }
  return bonus_point;
}

function calculateScore(dice_list) {
  const score = dice_list.reduce((sum, dice) => sum + dice, 0) + bonusPoint(dice_list);
  return score;
}

module.exports = calculateScore;