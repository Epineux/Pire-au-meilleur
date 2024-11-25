'use client';

import { questions } from '@/lib/question';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

const Question = () => {
  const [question, setQuestion] = useState(() => {
    if (typeof window === 'undefined') {
      return questions[0];
    }
    const sessionIndex = sessionStorage.getItem('questionIndex') || '0';
    return questions[parseInt(sessionIndex)] || questions[0];
  });

  const [isClient, setIsClient] = useState(false);

  const [currentTurn, setCurrentTurn] = useState(() => {
    if (typeof window === 'undefined') {
      return 1;
    }
    return parseInt(sessionStorage.getItem('currentTurn') || '1');
  });

  useEffect(() => {
    setIsClient(true);
    if (!sessionStorage.getItem('questionIndex')) {
      const newIndex = Math.floor(Math.random() * questions.length).toString();
      sessionStorage.setItem('questionIndex', newIndex);
      setQuestion(questions[parseInt(newIndex)]);
    }
  }, []);

  const handleChangeQuestion = () => {
    const newIndex = Math.floor(Math.random() * questions.length).toString();
    sessionStorage.setItem('questionIndex', newIndex);
    setQuestion(questions[parseInt(newIndex)]);
  };

  const handleNextTurn = () => {
    const nextTurn = currentTurn + 1;
    setCurrentTurn(nextTurn);
    sessionStorage.setItem('currentTurn', nextTurn.toString());

    const newIndex = Math.floor(Math.random() * questions.length).toString();
    sessionStorage.setItem('questionIndex', newIndex);
    setQuestion(questions[parseInt(newIndex)]);

    window.dispatchEvent(
      new CustomEvent('nextTurn', {
        detail: { turn: nextTurn },
      })
    );
  };

  if (!isClient) {
    return (
      <div className="flex justify-center">
        <p className="text-2xl">Loading...</p>
        <Button disabled>Change</Button>
      </div>
    );
  }

  return (
    <div className="flex justify-center rounded-lg bg-white ml-4 max-w-96 flex-col p-4 gap-4">
      <div className="text-sm text-gray-500 font-bold">Tour {currentTurn}</div>
      <p className="text-xl">{question}</p>
      <div className="flex gap-4">
        <Button onClick={handleChangeQuestion}>Changer de Question</Button>
        <Button onClick={handleNextTurn}>Prochain Tour</Button>
      </div>
    </div>
  );
};

export default Question;
