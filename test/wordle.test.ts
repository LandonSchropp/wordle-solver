import { nextWord, validateResponse } from "../source/wordle";

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

describe("nextWord", () => {

  it("returns a word from the provided array of words", () => {
    let words = [ "apple", "banana", "carrot" ];
    expect(words).toContain(nextWord(words));
  });
});
