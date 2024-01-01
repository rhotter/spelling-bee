"use client";
import React, { useState, useEffect } from "react";
import wordList from "../data/words.json"; // Import the word list
import { speakWord } from "@/utils/speakWord";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

const WordPlayer: React.FC = () => {
  const [remainingWords, setRemainingWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");

  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [lastAttemptedWord, setLastAttemptedWord] = useState<string>("");

  const [score, setScore] = useState<number>(0);
  const [mistakes, setMistakes] = useState<string[]>([]);

  useEffect(() => {
    // Initialize the remaining words list from the imported word list
    setRemainingWords(wordList);
  }, []);

  const playWord = () => {
    if (remainingWords.length === 0) {
      alert("All words completed!");
      return;
    }

    if (currentWord !== "") {
      // play the same word again if the user hasn't answered yet
      speakWord(currentWord);
      return;
    }

    const randomIndex = Math.floor(Math.random() * remainingWords.length);
    const word = remainingWords[randomIndex];
    setCurrentWord(word);
    speakWord(word);
    setIsCorrect(null);
    setLastAttemptedWord("");
    setUserInput("");
  };

  const checkAnswer = () => {
    const isAnswerCorrect =
      userInput.trim().toLowerCase() === currentWord.toLowerCase();
    setIsCorrect(isAnswerCorrect);
    setLastAttemptedWord(currentWord);

    if (isAnswerCorrect) {
      setScore(score + 1);
    } else {
      setMistakes((mistakes) => [...mistakes, currentWord]);
    }

    // Remove the word from the remaining words list
    const newRemainingWords = remainingWords.filter(
      (w, index) => w !== currentWord
    );

    setRemainingWords(newRemainingWords);
    setCurrentWord("");
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
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="border border-gray-200 p-2 rounded"
          placeholder="Type the word here"
        />
        {isCorrect === null && (
          <PaperAirplaneIcon
            className="h-6 w-6 text-blue-500 cursor-pointer"
            onClick={checkAnswer}
          />
        )}
        {isCorrect !== null &&
          (isCorrect ? (
            <CheckCircleIcon className="h-6 w-6 text-green-500" />
          ) : (
            <div className="flex items-center space-x-2">
              <XCircleIcon className="h-6 w-6 text-red-500" />
            </div>
          ))}
      </div>
      {isCorrect === false && (
        <span className="text-red-500">{lastAttemptedWord}</span>
      )}

      {mistakes.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Mistakes:</h3>
          <ul className="list-disc">
            {mistakes.map((mistake, index) => (
              <li key={index}>{mistake}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WordPlayer;
