import { readFileSync } from "fs";

const WORD_LENGTH = 5;

let DICTIONARY = readFileSync("/usr/share/dict/words", "utf-8")
  .split("\n")
  .filter(word => word.length === WORD_LENGTH);

/**
 * Provides a word to the user and prompts them to respond.
 */
async function prompt(word: string) {
  // eslint-disable-next-line no-console
  console.log(`Please try the word "${ word }".`);
  return await ask("How did Wordle respond?\n");
}

// eslint-disable-next-line
  console.log(`
    Thanks for using the Wordle solver!

    When responding to questions:

    * Use _ for no match.
    * Use lowercase letters for letters that are in the incorrect spot.
    * Use uppercase letters for letters in the correct spot.
  `.trim().replace(/^[^\S\n]+/mg, ""));

