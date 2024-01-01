// utils/speakWord.ts
export const speakWord = (word: string): void => {
  const utterance = new SpeechSynthesisUtterance(word);
  speechSynthesis.speak(utterance);
};
