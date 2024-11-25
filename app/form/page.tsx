'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PlayerForm() {
  const [numPlayers, setNumPlayers] = useState<number>(2);
  const [players, setPlayers] = useState<{ name: string; avatar: string }[]>(
    () =>
      Array(numPlayers)
        .fill(null)
        .map(() => ({ name: '', avatar: '' }))
  );
  const router = useRouter();

  const handleNumPlayersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Clamp the value between 1 and 10
    const num = Math.min(Math.max(parseInt(e.target.value), 1), 10);
    setNumPlayers(num);
    setPlayers(
      Array(num)
        .fill(null)
        .map(() => ({ name: '', avatar: '' }))
    );
  };

  const handlePlayerNameChange = (index: number, name: string) => {
    const newPlayers = players.map((player, i) =>
      i === index ? { ...player, name } : player
    );
    setPlayers(newPlayers);
  };

  const handleAvatarChange = (index: number, avatar: string) => {
    const newPlayers = players.map((player, i) =>
      i === index ? { ...player, avatar } : player
    );
    setPlayers(newPlayers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('players', JSON.stringify(players));
    router.push('/game');
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Combien de Joueurs ?</CardTitle>
        <CardDescription>
          Choisissez le nombre de joueurs et entrez leurs noms.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="numPlayers">Nombre de Joueurs</Label>
            <Input
              id="numPlayers"
              type="number"
              min="1"
              max="10"
              value={numPlayers}
              onChange={handleNumPlayersChange}
            />
          </div>
          {players.map((player, index) => (
            <div key={index} className="grid grid-cols-3 py-4 gap-2">
              <h1 className="col-span-3 font-bold mb-2">Player {index + 1}</h1>
              <div className="col-span-2 space-y-2">
                <Label htmlFor={`player${index + 1}`}>Name</Label>
                <Input
                  id={`player${index + 1}`}
                  value={player.name}
                  onChange={(e) =>
                    handlePlayerNameChange(index, e.target.value)
                  }
                  placeholder={`Enter Player ${index + 1} name`}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Avatar</Label>
                <Select
                  value={player.avatar}
                  onValueChange={(avatar) => handleAvatarChange(index, avatar)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Avatar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cat">
                      <Cat />
                    </SelectItem>
                    <SelectItem value="dog">
                      <Dog />
                    </SelectItem>
                    <SelectItem value="rabbit">
                      <Rabbit />
                    </SelectItem>
                    <SelectItem value="snail">
                      <Snail />
                    </SelectItem>
                    <SelectItem value="squirrel">
                      <Squirrel />
                    </SelectItem>
                    <SelectItem value="turtle">
                      <Turtle />
                    </SelectItem>
                    <SelectItem value="bird">
                      <Bird />
                    </SelectItem>
                    <SelectItem value="bug">
                      <Bug />
                    </SelectItem>
                    <SelectItem value="fish">
                      <Fish />
                    </SelectItem>
                    <SelectItem value="rat">
                      <Rat />
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
