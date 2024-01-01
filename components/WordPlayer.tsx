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
  const [mistakes, setMistakes] = useState<
    { mistake: string; correct: string }[]
  >([]);

  useEffect(() => {
    // Initialize the remaining words list from the imported word list
    setRemainingWords(wordList);
  }, []);

  const playWord = () => {
    if (remainingWords.length === 0) {
      alert("All words completed!");
      return;
    }

    // Only set a new word if currentWord is empty
    if (currentWord === "") {
      const randomIndex = Math.floor(Math.random() * remainingWords.length);
      const word = remainingWords[randomIndex];
      setCurrentWord(word);
      setIsCorrect(null);
      setLastAttemptedWord("");
      setUserInput("");
    } else {
      // If a word is already active, just play it again
      speakWord(currentWord);
    }
  };

  const checkAnswer = () => {
    const isAnswerCorrect =
      userInput.trim().toLowerCase() === currentWord.toLowerCase();

    setIsCorrect(isAnswerCorrect);
    setLastAttemptedWord(currentWord);

    if (isAnswerCorrect) {
      setScore(score + 1);
    } else {
      // Update the mistake to include both the user's mistake and the correct word
      setMistakes((mistakes) => [
        ...mistakes,
        { mistake: userInput, correct: currentWord },
      ]);
    }

    // Update the remaining words list and reset the current word
    setRemainingWords(remainingWords.filter((word) => word !== currentWord));
    setCurrentWord("");

    // Auto-select a new word from the remaining list
    if (remainingWords.length > 1) {
      const newRemainingWords = remainingWords.filter(
        (word) => word !== currentWord
      );
      const randomIndex = Math.floor(Math.random() * newRemainingWords.length);
      setCurrentWord(newRemainingWords[randomIndex]);
    }
  };

  useEffect(() => {
    // This effect plays the word when currentWord changes and is not empty
    if (currentWord !== "") {
      speakWord(currentWord);
    }
  }, [currentWord]);

  return (
    <div className="flex flex-col items-center">
      <p className="text-xl mb-4">
        Score:{" "}
        <span
          className={
            isCorrect === null
              ? "text-gray-500"
              : isCorrect
              ? "text-green-500"
              : ""
          }
        >
          {score}
        </span>
      </p>

      <button
        onClick={playWord}
        className="bg-blue-800 text-white p-2 rounded my-2"
      >
        Play Word
      </button>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => {
            setUserInput(e.target.value);
            if (isCorrect !== null) {
              setIsCorrect(null);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              checkAnswer();
            }
          }}
          className="border border-gray-200 p-2 rounded"
          placeholder="Type the word here"
          spellCheck={false}
        />
        {isCorrect === null && (
          <PaperAirplaneIcon
            className="h-6 w-6 text-blue-800 cursor-pointer"
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
              <li key={index}>
                Your answer:{" "}
                <span className="text-red-500">{mistake.mistake}</span> |
                Correct:{" "}
                <span className="text-green-500">{mistake.correct}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WordPlayer;
