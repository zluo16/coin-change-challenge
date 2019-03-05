const colors = require('colors');
const Table = require('cli-table');
const chars = require('./tableStyles');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

colors.setTheme({
  quarters: 'red',
  dimes: 'cyan',
  nickels: 'blue',
  pennies: 'yellow',
  count: 'green'
});

const q = colors.quarters('Quarters');
const d = colors.dimes('Dimes');
const n = colors.nickels('Nickels');
const p = colors.pennies('Pennies');

const table = new Table({
  head: [q, d, n, p],
  colWidths: [12, 12, 12, 12],
  chars: chars
});

function main(money) {
  const cents = parseInt(money * 100);
  const coins = { it: 0, quarters: 0, dimes: 0, nickels:0, pennies: 0, total_val: cents };
  let change = 0;
  coins.quarters = Math.floor(cents / 25);
  if (cents - (coins.quarters * 25) !== 0) {
    change = cents - (coins.quarters * 25);
  };
  while (coins.quarters > -1) {
    change = cents - (coins.quarters * 25);
    makeChange(coins, change);
    pushToTable(coins);
    dimesToNickels(coins);
    coins.quarters--;
  };
  let count = colors.count('Count: ' + coins.it)
  console.log(table.toString());
  console.log('\n' + count + '\n');
};

function makeChange(coins, change) {
  if (change > 0) {
    coins.dimes = Math.floor(change / 10);
    change = change - (coins.dimes * 10);
    coins.nickels = Math.floor(change / 5);
    change = change - (coins.nickels * 5);
    coins.pennies = change;
  };
};

function nickelCounter(coins) {
  let change = coins.total_val - ((coins.quarters * 25) + (coins.dimes * 10));
  if (change > 0) {
    coins.nickels = Math.floor(change / 5);
    change = change - (coins.nickels * 5);
    coins.pennies = change;
  };
};

function nickelsToPennies(coins) {
  while (coins.nickels > 0) {
    coins.nickels--;
    coins.pennies = coins.pennies + 5;
    pushToTable(coins);
  };
};

function dimesToNickels(coins) {
  while (coins.dimes > 0) {
    nickelsToPennies(coins);
    coins.dimes--;
    nickelCounter(coins);
    pushToTable(coins);
  };
  nickelsToPennies(coins);
};

function pushToTable(coins) {
  let quarters = colors.quarters(coins.quarters);
  let dimes = colors.dimes(coins.dimes);
  let nickels = colors.nickels(coins.nickels);
  let pennies = colors.pennies(coins.pennies);
  table.push([ quarters, dimes, nickels, pennies ]);
  coins.it++;
};

rl.question('How much money would you like to break? ', (answer) => {
  let money = parseFloat(answer);
  main(money);
  rl.close();
});
