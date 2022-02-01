import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const DIRNAME = path.dirname(fileURLToPath(import.meta.url));

export const DICTIONARY = readFileSync(path.join(DIRNAME, "../data/dictionary.txt"), "utf-8")
  .split("\n");
