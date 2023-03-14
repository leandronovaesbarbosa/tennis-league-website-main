import { useState } from 'react';
import Header from './base-layout/header';
import MatchesDrawToggle from './matches-draw-toggle';
import TableMatches from './table-matches';
import TableStandings from './table-standings';
import TournamentHeader from './tournament-header';

export default function TournamentView() {

  const [content, setContent] = useState('matches');

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 bg-white">
        <div className="">
          
          {/* <div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Copa Elo.net de 2023 (Etapa 1)</h1>
          </div> */}

          <TournamentHeader />

          <MatchesDrawToggle 
            content={content} 
            setContent={setContent} 
          />
          
          {content === "matches" ? <TableMatches /> : <TableStandings />}

        </div>
      </main>
    </>
  )
}
