import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';

function ActiveGamesPage() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('activeGames');
    if (stored) {
      try {
        setGames(JSON.parse(stored));
      } catch {
        setGames([]);
      }
    }
  }, []);

  const removeGame = (id) => {
    const updated = games.filter((g) => g.id !== id);
    setGames(updated);
    localStorage.setItem('activeGames', JSON.stringify(updated));
  };

  return (
    <>
      <Helmet>
        <title>Jogos Ativos</title>
      </Helmet>
      <div className="min-h-screen p-4 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Jogos Ativos</h1>
        {games.length === 0 ? (
          <p className="text-gray-300">Nenhum jogo ativo.</p>
        ) : (
          <ul className="space-y-4">
            {games.map((game) => (
              <li key={game.id} className="glass-effect p-4 rounded-xl flex justify-between items-center">
                <span className="text-white">{game.name}</span>
                <Button variant="destructive" onClick={() => removeGame(game.id)}>
                  Remover
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default ActiveGamesPage;
