"use client";
// components/WordPlayer.tsx
import React, { useState, useEffect } from "react";
import wordList from "../data/words.json"; // Import the word list
import { speakWord } from "@/utils/speakWord";

const WordPlayer: React.FC = () => {
  const [remainingWords, setRemainingWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    // Initialize the remaining words list from the imported word list
    setRemainingWords(wordList);
  }, []);

  const playWord = () => {
    if (remainingWords.length === 0) {
      alert("All words completed!");
      return;
    }
    const randomIndex = Math.floor(Math.random() * remainingWords.length);
    const word = remainingWords[randomIndex];
    setCurrentWord(word);
    speakWord(word);
    setResult("");
    setUserInput("");

    // Remove the word from the remaining words list
    const newRemainingWords = remainingWords.filter(
      (w, index) => index !== randomIndex
    );
    setRemainingWords(newRemainingWords);
  };

  const checkAnswer = () => {
    if (userInput.trim().toLowerCase() === currentWord.toLowerCase()) {
      setResult("Correct!");
      setScore(score + 1);
    } else {
      setResult("Incorrect");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-xl mb-4">Score: {score}</p>

      <button
        onClick={playWord}
        className="bg-blue-500 text-white p-2 rounded my-2"
      >
        Play Word
      </button>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className="border border-gray-300 p-2 rounded"
        placeholder="Type the word here"
      />
      <button
        onClick={checkAnswer}
        className="bg-green-500 text-white p-2 rounded my-2"
      >
        Check Answer
      </button>
      <p className="text-xl">{result}</p>
    </div>
  );
};

export default WordPlayer;
