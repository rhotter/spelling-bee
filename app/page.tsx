// pages/index.tsx
import type { NextPage } from "next";
import WordPlayer from "../components/WordPlayer";
import Link from "next/link";
import { Comic_Neue } from "next/font/google";

const comic = Comic_Neue({ weight: ["400", "700"], subsets: ["latin"] });

const Home: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen text-gray-900 px-8">
      {" "}
      {/* Flex container for the entire page */}
      <main className="flex-grow">
        <div className="flex flex-col items-center py-2 pt-8">
          <h1 className={`text-4xl font-bold mb-4 ${comic.className}`}>
            HFS Spelling Bee Practice
          </h1>
          <WordPlayer />
        </div>
      </main>
      <footer className="flex justify-center p-4">
        <Link
          href="https://github.com/rhotter/spelling-bee"
          className="underline text-gray-500 hover:text-gray-700"
        >
          View Code
        </Link>
      </footer>
    </div>
  );
};

export default Home;
