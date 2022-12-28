const fs = require('fs');
const monkeys = fs.readFileSync('2022-12-21-input.txt', 'utf8').split('\n');

let root1, root2;
let savedMonkeys = new Map();

while (!savedMonkeys.has(root1) || !savedMonkeys.has(root2)) {
  for (let monkey of monkeys) {

    let monkeyName = monkey.split(':')[0];
    let monkeySays = monkey.split(':')[1];
  
    if (monkeyName === 'root') {
      root1 = monkeySays.slice(1,5);
      root2 = monkeySays.slice(8);
      monkeys.splice(monkeys.indexOf(monkey), 1);
    } 
    // not root monkeys
    else {
      // number monkeys
     if (Number.isInteger(Number(monkeySays))) {
      savedMonkeys.set(monkeyName, Number(monkeySays));
      monkeys.splice(monkeys.indexOf(monkey), 1);
     }
     // 2 monkeys with operation
     else {
      let monkey1 = monkeySays.slice(1, 5);
      let monkey2 = monkeySays.slice(8);
      let operator = monkeySays[6];
  
      // if both monkeys have numbers saved
      if (savedMonkeys.has(monkey1) && savedMonkeys.has(monkey2)) {
        if (operator === '+') {
          savedMonkeys.set(monkeyName, savedMonkeys.get(monkey1) + savedMonkeys.get(monkey2));
        } else if (operator === '-') {
          savedMonkeys.set(monkeyName, savedMonkeys.get(monkey1) - savedMonkeys.get(monkey2));
        } else if (operator === '*') {
          savedMonkeys.set(monkeyName, savedMonkeys.get(monkey1) * savedMonkeys.get(monkey2));
        } else {
          savedMonkeys.set(monkeyName, savedMonkeys.get(monkey1) / savedMonkeys.get(monkey2));
        }
        monkeys.splice(monkeys.indexOf(monkey), 1);
      }
     }
    }
  }
}

let output = savedMonkeys.get(root1) + savedMonkeys.get(root2);
console.log(output);

/*
sample input

root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32
*/