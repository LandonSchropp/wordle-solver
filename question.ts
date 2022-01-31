import { createInterface } from "readline";

/**
 * This is a simple wrapper around Node.js's funky readline library.
 * @param question The question to ask the user.
 * @return Returns a promise that resolves to the questions' answer.
 */
export async function ask(question: string): Promise<string> {
  return new Promise(resolve => {
    let readline = createInterface({ input: process.stdin, output: process.stdout });

    readline.question(question, response => {
      readline.close();
      resolve(response);
    });
  });
}
