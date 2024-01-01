"use client";

import { getRandomWord } from "@/utils/getRandomWord";
import { speakWord } from "@/utils/speakWord";
import React, { useState } from "react";

const WordPlayer: React.FC = () => {
  const [currentWord, setCurrentWord] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const playWord = () => {
    const word = getRandomWord();
    setCurrentWord(word);
    speakWord(word);
    setResult("");
    setUserInput("");
  };

  const checkAnswer = () => {
    setResult(
      userInput.trim().toLowerCase() === currentWord.toLowerCase()
        ? "Correct!"
        : "Incorrect"
    );
  };

  return (
    <div className="flex flex-col items-center">
      <button onClick={playWord} className="bg-blue-500 p-2 rounded my-2">
        Play Word
      </button>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className="border-2 border-gray-300 p-2 rounded text-black"
        placeholder="Type the word here"
      />
      <button onClick={checkAnswer} className="bg-green-500 p-2 rounded my-2">
        Check Answer
      </button>
      <p className="text-xl">{result}</p>
    </div>
  );
};

export default WordPlayer;
