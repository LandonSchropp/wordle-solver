import { distribution, filterWords, isMatch, nextWord, validateResponse } from "../source/wordle";

describe("validateResponse", () => {

  describe("when the response is valid", () => {

    it("does not throw an error", () => {
      expect(() => validateResponse("abcde")).not.toThrow();
    });
  });

  describe("when the response is too short", () => {

    it("throws an error", () => {
      expect(() => validateResponse("abcd")).toThrow();
    });
  });

  describe("when the response is too long", () => {

    it("throws an error", () => {
      expect(() => validateResponse("abcdef")).toThrow();
    });
  });

  describe("when the response contains invalid characters", () => {

    it("throws an error", () => {
      expect(() => validateResponse("-----")).toThrow();
    });
  });
});

describe("distribution", () => {

  describe("when the array of words is empty", () => {

    it("returns an empty object", () => {
      expect(distribution([])).toEqual({});
    });
  });

  describe("when the array of words contains a word with no duplicate letters", () => {

    it("returns an object containing an equal distribution of letters", () => {
      expect(distribution([ "tears" ])).toEqual({
        "a": 0.2,
        "e": 0.2,
        "r": 0.2,
        "s": 0.2,
        "t": 0.2
      });
    });
  });

  describe("when the array of words contains a word with duplicate letters", () => {

    it("returns an object containing the relative distribution of letters", () => {
      expect(distribution([ "apple" ])).toEqual({
        "a": 0.2,
        "e": 0.2,
        "l": 0.2,
        "p": 0.4
      });
    });
  });

  describe("when the array of words contains a word with duplicate letters", () => {

    it("returns an object containing the relative distribution of letters", () => {
      expect(distribution([ "apple", "pears" ])).toEqual({
        "a": 0.2,
        "e": 0.2,
        "l": 0.1,
        "p": 0.3,
        "r": 0.1,
        "s": 0.1
      });
    });
  });
});

describe("nextWord", () => {

  it("returns a word from the provided array of words", () => {
    let words = [ "apple", "banana", "carrot" ];
    expect(words).toContain(nextWord(words));
  });

  describe("when the words contains a variety of words", () => {

    it("returns the word containing the most common letters", () => {
      expect(nextWord([ "apple", "pears", "libel" ])).toEqual("apple");
    });
  });
});

describe("isMatch", () => {

  describe("when the word is an exact match", () => {

    it("returns true", () => {
      expect(isMatch("beans", "beans", "BEANS")).toBe(true);
    });
  });

  describe("when the word is a match", () => {

    it("returns true", () => {
      expect(isMatch("beans", "beast", "BEAs_")).toBe(true);
    });
  });

  describe("when the word contains a partial match more than once", () => {

    it("returns true", () => {
      expect(isMatch("zooms", "oaken", "o____")).toBe(true);
    });
  });

  describe("when the response excludes a second partial match", () => {

    it.skip("returns true", () => {
      expect(isMatch("light", "tight", "_IGHT")).toBe(true);
    });
  });

  describe("when the word contains a rejected letter", () => {

    it("returns false", () => {
      expect(isMatch("beans", "beast", "_EAST")).toBe(false);
    });
  });

  describe("when the word does not contain one of the exact matches", () => {

    it("returns false", () => {
      expect(isMatch("beans", "fears", "FEA_s")).toBe(false);
    });
  });

  describe("when the word contains a misplaced letter in the wrong spot", () => {

    it("returns false", () => {
      expect(isMatch("beans", "burns", "___n_")).toBe(false);
    });
  });

  describe("when the word does not contain one of the misplaced letters", () => {

    it("returns false", () => {
      expect(isMatch("beans", "abort", "__o__")).toBe(false);
    });
  });
});

describe("filterWords", () => {

  it("filters out the words that don't match", () => {
    expect(filterWords([ "apple", "armor", "zooms" ], "thank", "__a__")).not.toContain("zooms");
  });

  it("keeps the words that do match", () => {
    expect(filterWords([ "apple", "armor", "zooms" ], "thank", "__a__")).toContain("apple");
    expect(filterWords([ "apple", "armor", "zooms" ], "thank", "__a__")).toContain("armor");
  });
});
