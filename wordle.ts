/**
 * Validates that the provided response is in the correct format.
 */
export function validateResponse(response: string) {
  if (!/^\w+$/.test(response)) {
    throw new Error(`The response '${ response }' is not valid!`);
  }
}
