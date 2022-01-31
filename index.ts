import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { ask } from "./question.js";
import { filterWords, nextWord } from "./wordle.js";

const WORD_LENGTH = 5;

const DIRNAME = path.dirname(fileURLToPath(import.meta.url));

let words = readFileSync(path.join(DIRNAME, "data/dictionary.txt"), "utf-8")
  .split("\n")
  .filter(word => word.length === WORD_LENGTH);

const INTRODUCTION = `
Thanks for using the Wordle solver!

When responding to questions:

* Use _ for no match.
* Use lowercase letters for letters that are in the incorrect spot.
* Use uppercase letters for letters in the correct spot.

For example, if you tried the word 'beans', the first and middle letters were correct and the last
letter was misplaced, you'd respond with 'B_A_s'.
`.trim();

// eslint-disable-next-line
console.log(`\n${ INTRODUCTION }`);

/**
 * Provides a word to the user and prompts them to respond.
 */
async function prompt(words: string[], word: string) {
  /* eslint-disable no-console */
  console.log(`\nThere are ${ words.length.toLocaleString() } possible answers.`);
  console.log(`Please try the word '${ word }'.`);
  /* eslint-enable no-console */

  let response = await ask("How did Wordle respond?\n");

  return response;
}

for (let attempts = 0, words = DICTIONARY; attempts < 6 && words.length > 1; attempts++) {
  let word = nextWord(words);
  let response = await prompt(words, word);
  words = filterWords(words, response);
}
