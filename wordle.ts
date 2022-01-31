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
  return words[0];
}

/**
 * Filters the array of words using the Wordle response.
 */
export function filterWords(words: string[], response: string) {
  return words;
}
