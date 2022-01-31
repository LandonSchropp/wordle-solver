import { readFileSync } from "fs";

const WORD_LENGTH = 5;

let words = readFileSync("/usr/share/dict/words", "utf-8")
  .split("\n")
  .filter(word => word.length === WORD_LENGTH);

console.log(words.length);
