# The Coin Change Challenge
##### Iterative Solutions vs. Recursive Solutions


### Clone repo and install gems and node modules
```bash
git clone git@github.com:zluo16/coin-change-challenge.git
bundle install && npm install
```
### Run CLI program for main solution
```bash
npm start
```
### Example prompts and input
```bash
Has the Fed collapsed? 'Y of N': # 'N'
How much money would you like to break?:
```
If you input `'N'` on the first prompt and `1` on on the second, the output should look something like this:
```bash
+===========+===========+==========+==========+
|              Change Combinations            |
+===========+===========+==========+==========+
|   Quarter |   Dime    |   Nickel |   Penny  |
+===========+===========+==========+==========+
|      0    |      0    |     0    |    100   |
|      0    |      0    |     1    |     95   |
|      ...  |      ...  |     ...  |     ...  |
|      ...  |      ...  |     ...  |     ...  |
|      3    |      2    |     1    |     0    |
|      4    |      0    |     0    |     0    |
+===========+===========+==========+==========+

Count: 242

```
An input of `'Y'` on the prompt that asks if the Fed has collapsed will send you to another prompt that asks you to
name denominations and provide the amount of each denomination one would need to break a dollar.
```bash
Has the Fed collapsed? 'Y of N': # 'Y'
Input new denominations and how much is needed of each to total one dollar
'Quarter,4,Dime,10,Nickel,20,Penny,100'
Comma seperated with no spaces:
```
If you input `Half Dollar,2,Quarter,4,Dime,10,Nickel,20,Penny,100` and `1` when it asks you how much money you would
like to break, the ouput will look like this:
```bash
How much money would you like to break?: # 1

+===============+===========+===========+==========+==========+
|                      Change Combinations                    |
+===============+===========+===========+==========+==========+
|   Half Dollar |   Quarter |   Dime    |   Nickel |   Penny  |
+===============+===========+===========+==========+==========+
|        0      |      0    |      0    |     0    |    100   |
|        0      |      0    |      0    |     1    |     95   |
|        0      |      0    |      0    |     2    |     90   |
|        ...    |      ...  |      ...  |     ...  |     ...  |
|        ...    |      ...  |      ...  |     ...  |     ...  |
|        ...    |      ...  |      ...  |     ...  |     ...  |
|        1      |      1    |      2    |     1    |     0    |
|        1      |      2    |      0    |     0    |     0    |
|        2      |      0    |      0    |     0    |     0    |
+===============+===========+===========+==========+==========+

Count: 292

```

## Breakdown of the Problems
***
<dl>
  <dt>Part One</dt>
  <dd>
    Write an algorithm that outputs the number of ways pennies, nickels, dimes, and quarters can be combined to sum exactly $1.
  </dd>
</dl>
There are multiple pieces of information that we are given in the first part of this challenge that one can work off of.

We have:
- 4 denominations: quarters, dimes, nickels, pennies
- Each denomination is worth a consistent amount that doesn't change: Q (25), D (10), N (5), P(1)
- Each denomination breaks a dollar (100) evenly
- We only have to break $1

With this, I was able to make a brute force solution starting from 4 quarters then making change by
removing one quarter at a time and slowly transfering the change down each denomination to pennies.

Quarters | Dimes | Nickels | Pennies
---|---|---|---
4 | 0 | 0 | 0
3 | 2 | 1 | 0
3 | 2 | 0 | 5
3 | 1 | 3 | 0
etc. | etc. | etc. | etc.

Count : 242

You can take a look at this solution in the `makeChange.js` file.

If you want to run this solution in the command line you can do it with this:

```bash
npm run old
```
##### I was able to add some cool colors to the output of this one!

***
<dl>
  <dt>Part Two</dt>
  <dd>
    Alter your above algorithm to produce the same output but for an arbitrary set of currency names and denominations and for an arbitrary total sum.
  </dd>
</dl>
This part was very challenging.

It's challenging because all the pieces of information that we had before, that made it easier for us
to find a quick solution to the initial problem, is now abstracted away. We don't even know how much
money we have to break!

On top of that, the example that was given was particularly wonky:

Coin: 1.5 = $1, Arrowhead: 3 = 1$, Button: 150 = 1$

Coin | Arrowhead | Button
---|---|---
0 | 0 | 150
0 | 1 | 100
0 | 2 | 50
0 | 3 | 0
1 | 0 | 50
1 | 1 | 0

Count: 6

The smallest denomination, button, is worth 0.6666666 of a cent so the values given don't even break a dollar evenly.

All this ment that I had to do some research iterative and recursive programming approaches.

The solution that I found for this was to create a recursive function that takes in an amount of
change that we need to account for and a denomination. We move down an array of denominations
(ordered from largest to smallest) and we add denominations when we need to. Then we iterate over
each amount of the denomination needed to make up the change and call the function/method with new
values on each iteration.

You can find this solution in the `make_change_armageddon.rb` file and the logic for the above method
that I described in the `find_combinations` method.

As I stated at the beginning, you can run this solution by entering `npm start` in the terminal. Just
make sure you ran `bundle install` first!

```bash
npm start
```
