import { readFileSync } from "fs";

// HACK: Unfortunately, the testing environment and runtime environment don't share the same set of
// global variables used to determine the current directory name. This is a quick workaround to get
// the project moving forward. Ideally, these environments would be brought into alignment.
export const DICTIONARY = readFileSync("data/dictionary.txt", "utf-8").split("\n");
