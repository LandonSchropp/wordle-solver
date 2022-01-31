import { DICTIONARY } from "./dictionary.js";
import { ask } from "./question.js";
import { filterWords, nextWord, validateResponse } from "./wordle.js";

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
async function prompt(numberOfWords: number, word: string) {
  /* eslint-disable no-console */
  console.log(`\nThere are ${ numberOfWords.toLocaleString() } possible answers.`);
  console.log(`Please try the word '${ word }'.`);
  /* eslint-enable no-console */

  let response = await ask("How did Wordle respond?\n");

  return response;
}

let words = DICTIONARY;

// Loop through the words, reducing the number each time.
for (let attempts = 0; attempts < 6 && words.length > 1; attempts++) {
  let attempt = nextWord(words);
  let response = await prompt(words.length, attempt);
  validateResponse(response);
  words = filterWords(words, attempt, response);
}

if (words.length !== 1) {
  // eslint-disable-next-line no-console
  console.log("\nOh no! Something's gone horribly wrong. No matches could be found.");
  process.exit(1);
}

// eslint-disable-next-line no-console
console.log(`\nThe answer is '${ words[0] }'! Nice job.`);
