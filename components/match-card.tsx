import MatchScoreDisplay from "./match-score-display";

const match = { 
  player1: 'André', player2: 'Pedro', status: 'Finalizada', scorePlayer1: [4, 6, 2], scorePlayer2: [6, 2, 6] 
};

export default function MatchCard() {
  return (
    <div className="flex whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900 sm:pl-3 items-center w-full rounded-md border border-gray-100">
      <div className="pr-4 grow">
        <div>
          {match.player1}
        </div>
        <div>
          {match.player2}
        </div>
      </div>
      <div className="flex whitespace-nowrap px-3 text-sm text-gray-500">
        <MatchScoreDisplay 
          scorePlayer1={match.scorePlayer1} 
          scorePlayer2={match.scorePlayer2} 
        />
      </div>
    </div>
  )
}