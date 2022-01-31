import { sample } from "lodash-es";

/**
 * Validates that the provided response is in the correct format.
 */
export function validateResponse(response: string) {
  if (!/^\w+$/.test(response)) {
    throw new Error(`The response '${ response }' is not valid!`);
  }
}

/**
 * Chooses the next word to try from the array of words.
 */
export function nextWord(words: string[]) {
  return sample(words);
}

/**
 * Returns true if the word matches the exact letters in the response.
 */
function matchesExactLetters(word: string, response: string) {
  return new RegExp(response.replaceAll(/[a-z_]/g, ".").toLowerCase()).test(word);
}

/**
 * Returns true if the word does not contain any of the letters that were rejected from the attempt.
 */
function doesNotContainRejectedLetters(word: string, attempt: string, response: string) {
  let rejectedLetters = attempt.split("").filter((attemptLetter, index) => response[index] === "_");
  return new RegExp(`[^${ rejectedLetters.join("") }]{5}`).test(word);
}

/**
 * Returns true if the provided word matches the given attempt and response.
 */
function isMatch(word: string, attempt: string, response: string) {
  return matchesExactLetters(word, response)
    && doesNotContainRejectedLetters(word, attempt, response);
}

/**
 * Filters the array of words using the Wordle response.
 */
export function filterWords(words: string[], attempt: string, response: string) {
  return words.filter(word => isMatch(word, attempt, response));
}
