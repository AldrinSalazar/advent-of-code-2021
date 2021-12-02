const fs = require("fs");

const rawInput = fs.readFileSync("input.txt").toString();
const input = rawInput.split("\n");

//Part 1
const instructionMap1 = {
  forward: (state, n) => (state.horizontal += n),
  down: (state, n) => (state.depth += n),
  up: (state, n) => (state.depth -= n),
};

const state1 = { horizontal: 0, depth: 0 };

input.forEach((sentence) => {
  const [instruction, n] = sentence.split(" ");
  instructionMap1[instruction](state1, parseInt(n));
});

console.log(state1.horizontal * state1.depth);

//Part 2
const instructionMap2 = {
  forward: (state, n) => {
    state.horizontal += n;
    state.depth += state.aim * n;
  },
  down: (state, n) => (state.aim += n),
  up: (state, n) => (state.aim -= n),
};

const state2 = { horizontal: 0, depth: 0, aim: 0 };

input.forEach((sentence) => {
  const [instruction, n] = sentence.split(" ");
  instructionMap2[instruction](state2, parseInt(n));
});

console.log(state2.horizontal * state2.depth);
