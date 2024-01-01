export const speakWord = (word: string): void => {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.rate = 0.5; // Set this to a lower value for slower speech
  speechSynthesis.speak(utterance);
};
