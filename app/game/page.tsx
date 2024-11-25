'use client';

import MysteryNumberCards from '@/components/mistery-number-cards';
import Question from '@/components/Question';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Define a type for player information
type Player = {
  name: string;
  avatar: string;
};

export default function HomePage() {
  const router = useRouter();
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const storedPlayers = localStorage.getItem('players');
    if (storedPlayers) {
      setPlayers(JSON.parse(storedPlayers));
    }
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold m-4 p-4 bg-white w-fit rounded-lg">
        Pire au Meilleur Online
      </h1>
      <Button className="m-4" onClick={() => router.push('/form')}>
        Modifier les joueurs
      </Button>
      <Question />
      <MysteryNumberCards players={players} />
    </div>
  );
}
