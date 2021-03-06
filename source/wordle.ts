import _ from "lodash";

/**
 * Validates that the provided response is in the correct format.
 */
export function validateResponse(response: string) {
  if (!/^\w{5}$/.test(response)) {
    // eslint-disable-next-line no-console
    throw new Error(`\nThe response '${ response }' is not valid!`);
  }
}

/**
 * Returns an distribution object contains the relative percentages of each letter.
 */
export function distribution(words: string[]) {
  let letters = words.join("").split("");
  return _.mapValues(_.countBy(letters), (count) => count / letters.length);
}

/**
 * Chooses the next word to try from the array of words.
 */
export function nextWord(words: string[]) {
  let letterDistribution = distribution(words);

  return _.maxBy(words, word => {
    return word
      .split("")
      .map(letter => letterDistribution[letter])
      .reduce((accumulator, value) => accumulator + value, 0);
  });
}

/**
 * Returns true if the word matches the exact letters in the response.
 */
function matchesExactLetters(word: string, response: string) {
  return new RegExp(response.replace(/[a-z_]/g, ".").toLowerCase()).test(word);
}

/**
 * Returns true if the word does not contain any of the letters that were rejected from the attempt.
 */
function doesNotContainRejectedLetters(word: string, attempt: string, response: string) {
  let rejectedLetters = attempt.split("").filter((_letter, index) => response[index] === "_");
  return new RegExp(`[^${ rejectedLetters.join("") }]{5}`).test(word);
}

/**
 * Returns true if the word does not contain any of the misplaced letters where they're not an exact
 * match.
 */
function doesNotHaveMisplacedLettersInWrongSpot(word: string, attempt: string, response: string) {
  return new RegExp(
    response.replace(/./g, letter => {
      return /[a-z]/.test(letter) ? `[^${ letter }]` : ".";
    })
  ).test(word);
}

/**
 * Returns true if the word contains all of the letters that were present in the response but were
 * not in the correct location.
 */
function conatainsMisplacedLetters(word: string, attempt: string, response: string) {
  return attempt.split("")
    .filter((letter, index) => letter === response[index])
    .every(letter => word.includes(letter));
}

/**
 * Returns true if the provided word matches the given attempt and response.
 */
export function isMatch(word: string, attempt: string, response: string) {
  return matchesExactLetters(word, response)
    && doesNotContainRejectedLetters(word, attempt, response)
    && doesNotHaveMisplacedLettersInWrongSpot(word, attempt, response)
    && conatainsMisplacedLetters(word, attempt, response);
}

/**
 * Filters the array of words using the Wordle response.
 */
export function filterWords(words: string[], attempt: string, response: string) {
  return words.filter(word => isMatch(word, attempt, response));
}
