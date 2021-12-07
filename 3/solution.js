const fs = require("fs");

const rawInput = fs.readFileSync("input.txt").toString();
const input = rawInput.split("\r\n");
const bits = input[0].length;
const halfLength = input.length / 2;

const sum = (a, b) => {
  const result = [];
  a.forEach((v, i) => (result[i] = v + parseInt(b[i])));
  return result;
};

const gamma = parseInt(
  input
    .reduce((acc, curr) => {
      acc = sum(acc, curr.split(""));
      return acc;
    }, Array(bits - 1).fill(0))
    .map((v) => (v > halfLength ? 1 : 0))
    .join(""),
  2
);

const epsilon = parseInt(
  input
    .reduce((acc, curr) => {
      acc = sum(acc, curr.split(""));
      return acc;
    }, Array(bits - 1).fill(0))
    .map((v) => (v > halfLength ? 0 : 1))
    .join(""),
  2
);

console.log({ gamma, epsilon, r: gamma * epsilon });

//2nd part
let input2dOxygen = input.map((i) => i.split("").map((n) => parseInt(n)));
let input2dC02 = JSON.parse(JSON.stringify(input2dOxygen));
const hammingWeight = (arr) => arr.reduce((acc, curr) => (acc += curr), 0);
let currentBit = 0;

//Oxygen
do {
  let input2dtOxygen = Array(bits)
    .fill(0)
    .map(() => []);

  for (let i = 0; i < input2dOxygen.length; i++) {
    for (let j = 0; j < bits; j++) {
      input2dtOxygen[j][i] = input2dOxygen[i][j];
    }
  }

  if (hammingWeight(input2dtOxygen[currentBit]) >= input2dOxygen.length / 2) {
    input2dOxygen = input2dOxygen.filter((v) => v[currentBit] == 1);
  } else {
    input2dOxygen = input2dOxygen.filter((v) => v[currentBit] == 0);
  }

  currentBit++;
} while (input2dOxygen.length > 1);

currentBit = 0;

//C02
do {
  let input2dtC02 = Array(bits)
    .fill(0)
    .map(() => []);

  for (let i = 0; i < input2dC02.length; i++) {
    for (let j = 0; j < bits; j++) {
      input2dtC02[j][i] = input2dC02[i][j];
    }
  }

  if (hammingWeight(input2dtC02[currentBit]) >= input2dC02.length / 2) {
    input2dC02 = input2dC02.filter((v) => v[currentBit] == 0);
  } else {
    input2dC02 = input2dC02.filter((v) => v[currentBit] == 1);
  }

  currentBit++;
} while (input2dC02.length > 1);

const oxygen = parseInt(input2dOxygen[0].join(""), 2);
const c02 = parseInt(input2dC02[0].join(""), 2);
console.log({ input2dOxygen, oxygen });
console.log({ input2dC02, c02 });

console.log({ result: oxygen * c02 });
