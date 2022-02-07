import { readFileSync } from "fs";

export const DICTIONARY = readFileSync(
  "/Users/landon/Development/personal/wordle-solver/data/dictionary.txt",
  "utf-8"
).split("\n");
