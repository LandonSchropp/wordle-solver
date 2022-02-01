# Wordle Solver

This is a simple script that the daily [Wordle](https://www.powerlanguage.co.uk/wordle/) problem.
This implementation is written in [TypeScript](https://www.typescriptlang.org/), and my primarily
goal in creating it is to increase my familiarity with the language.

## Running the Script

To run the script, install the project's dependencies with `yarn install` and then run the solver
with `yarn solve`. Additionally, the project's test suite can be run with `yarn test`.

## Design

Solving Wordle problems is surprisingly tricky. The game is similar to Guess Who in that you start
with a finite set of possibilites, and use guesses to narrow down the results. However, unlike Guess
Who, the response is not binary. *Each letter* in wordle's response can be one of three
possibilities.

* The result does not contain the letter (gray).
* The result contains the letter, but it's in the wrong spot (yellow).
* The result contains the letter and it's in the correct spot (green).

Additionally, there are some other considerations that make this problem challenging.

* The yellow result actually contains *two* pieces of information. It tells you the letter is
  contained in the word. It also tells you the letter is not in the right spot.
* The best word to pick may or may not be a possible solution. If a word has been eliminated but
  will quickly filter down the possibilities, then it might still be the best choice.
* It's possible for a letter to be contained in a word more than once.
* If you attempt to try a double letter, and the word only contains it once, then Wordle will mark
  the second instance as incorrect.

All of these constraints add up to a very difficult problem. I'm sure there's a mathematically
optimal strategy to solve this. However, the goal of this project is not to find the *perfect*
solution, but rather to find a solution that works the majority of the time.

The algorithm for this project is broken down into three steps:

1. Pick a word to try.
2. Using the provided response, filter the possible words.
3. Repeat.

Of these three steps, the first one is the most difficult. How do we determine the best possible
word? Conceptually, we want to *pick the word that will eliminate the most possibilities*, so we can
get to the correct answer as quickly as possible.

## Data

Wordle appears to source its words from the [Collins Scrabble Words
2019 (CSW19)](https://boardgames.stackexchange.com/a/38386) dictionary. Additionally, Josh Wardle
filtered down the list to words that he personally knew to contain the day's answer.

I filtered this dictionary down to the five-letters words and stored the result in
[dictionary.txt](data/dictionary.txt). However, my list contains all of the five-letter words from
CSW19.
