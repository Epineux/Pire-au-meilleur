'use client';
import {
  Bird,
  Bug,
  Cat,
  Dog,
  Fish,
  Rabbit,
  Rat,
  Snail,
  Squirrel,
  Turtle,
} from 'lucide-react';
import { useEffect, useState } from 'react';

type Player = {
  name: string;
  avatar: string;
};

const avatarComponents: { [key: string]: React.ReactNode } = {
  bird: <Bird className="h-20 w-20 text-amber-200" />,
  bug: <Bug className="h-20 w-20 text-amber-200" />,
  cat: <Cat className="h-20 w-20 text-amber-200" />,
  dog: <Dog className="h-20 w-20 text-amber-200" />,
  fish: <Fish className="h-20 w-20 text-amber-200" />,
  rabbit: <Rabbit className="h-20 w-20 text-amber-200" />,
  rat: <Rat className="h-20 w-20 text-amber-200" />,
  snail: <Snail className="h-20 w-20 text-amber-200" />,
  squirrel: <Squirrel className="h-20 w-20 text-amber-200" />,
  turtle: <Turtle className="h-20 w-20 text-amber-200" />,
};

export default function MysteryNumberCards({ players }: { players: Player[] }) {
  const [flippedCards, setFlippedCards] = useState<boolean[]>(
    Array(players.length).fill(false)
  );
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);

  const generateUniqueNumbers = () => {
    const numbers = new Set<number>();
    while (numbers.size < players.length) {
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      numbers.add(randomNumber);
    }
    return Array.from(numbers);
  };

  useEffect(() => {
    setRandomNumbers(generateUniqueNumbers());
  }, [players.length]);

  // Handle turn changes
  useEffect(() => {
    const handleTurnChange = () => {
      setFlippedCards(Array(players.length).fill(false));

      setRandomNumbers(generateUniqueNumbers());
    };

    window.addEventListener('nextTurn', handleTurnChange);
    return () => {
      window.removeEventListener('nextTurn', handleTurnChange);
    };
  }, [players.length]);

  const handleCardClick = (index: number) => {
    setFlippedCards((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = !updatedState[index];
      return updatedState;
    });
  };

  return (
    <div className="container mx-auto p-4 mt-16">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] gap-4">
        {players.map((player, index) => (
          <div key={player.name} className="flex flex-col gap-2 items-center">
            <h1 className="text-center font-bold">{player.name}</h1>
            <div
              className="relative w-36 h-36"
              onClick={() => handleCardClick(index)}
              style={{
                perspective: '1000px',
              }}
            >
              <div
                className="absolute inset-0 w-full h-full transition-transform duration-500"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flippedCards[index]
                    ? 'rotateY(180deg)'
                    : 'rotateY(0deg)',
                }}
              >
                {/* Front Side */}
                <div
                  className="absolute w-full h-full flex items-center justify-center rounded-lg bg-black cursor-pointer"
                  style={{
                    backfaceVisibility: 'hidden',
                  }}
                >
                  {avatarComponents[player.avatar] || (
                    <Cat className="h-20 w-20 text-amber-200" />
                  )}
                </div>
                {/* Back Side */}
                <div
                  className="absolute w-full h-full bg-black text-amber-200 flex items-center justify-center text-5xl rounded-lg cursor-pointer font-bold"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <span>{randomNumbers[index]}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
