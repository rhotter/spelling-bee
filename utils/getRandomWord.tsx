import wordList from "../data/words.json";

export const getRandomWord = (): string => {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randomIndex];
};
