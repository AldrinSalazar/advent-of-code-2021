const fs = require("fs");

const input = fs.readFileSync("input.txt").toString();
const inputSplit = input.split("\n");
//Part 1
let solution1 = 0;
inputSplit.reduce((prev, curr) => {
  solution1 += curr > prev;
  return curr;
}, 0);

console.log(solution1);

// Part 2
let solution2 = 0;
let sums = [];
for (let i = 1; i < inputSplit.length - 1; i++) {
  sums.push(
    parseInt(inputSplit[i - 1]) +
      parseInt(inputSplit[i]) +
      parseInt(inputSplit[i + 1])
  );
}

sums.reduce((prev, curr) => {
  solution2 += curr > prev;
  return curr;
}, 0);

console.log(solution2 - 1);
