// pages/index.tsx
import type { NextPage } from "next";
import Head from "next/head";
import WordPlayer from "../components/WordPlayer";

const Home: NextPage = () => {
  return (
    <div>
      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to the Spelling Bee!
        </h1>
        <WordPlayer />
      </main>
    </div>
  );
};

export default Home;
