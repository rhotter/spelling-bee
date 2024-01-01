// pages/index.tsx
import type { NextPage } from "next";
import WordPlayer from "../components/WordPlayer";

const Home: NextPage = () => {
  return (
    <div>
      <main className="flex flex-col items-center py-2 pt-8">
        <h1 className="text-4xl font-bold mb-4">HFS Spelling Bee Practice</h1>
        <WordPlayer />
      </main>
    </div>
  );
};

export default Home;
