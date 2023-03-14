interface Props {
  scorePlayer1: (number | null)[];
  scorePlayer2: (number | null)[];
}

function calculateTennisMatchWinner({scorePlayer1, scorePlayer2}: Props) {
  let player1SetWins = 0;
  let player2SetWins = 0;

  let player1Scores = [
    {score: 0, winner: false},
    {score: null, winner: false},
    {score: null, winner: false},
    {score: null, winner: false},
  ];
  let player2Scores = [
    {score: 0, winner: false},
    {score: null, winner: false},
    {score: null, winner: false},
    {score: null, winner: false},
  ];

  // Loop through the scores of each set and calculate the set winner
  for (let i = 0; i < scorePlayer1.length; i++) {
    const p1SetScore = scorePlayer1[i];
    const p2SetScore = scorePlayer2[i];
    if ((p1SetScore !== null && p2SetScore !== null)) {
      if (p1SetScore > p2SetScore) {
        player1SetWins++;
        player1Scores[i+1] = {score: p1SetScore, winner: true};
        player2Scores[i+1] = {score: p2SetScore, winner: false};
      } else {
        player2SetWins++;
        player2Scores[i+1] = {score: p2SetScore, winner: true};
        player1Scores[i+1] = {score: p1SetScore, winner: false};
      }
    }
  }

  // Determine the match winner based on number of set wins
  if (player1SetWins > player2SetWins) {
    player1Scores[0] = {score: player1SetWins, winner: true};
    player2Scores[0] = {score: player2SetWins, winner: false};
  } else {
    player2Scores[0] = {score: player2SetWins, winner: true};
    player1Scores[0] = {score: player1SetWins, winner: false};
  }

  if (player1SetWins === 0 && player2SetWins === 0) {
    player2Scores[0] = {score: player2SetWins, winner: false};
  }

  return { player1Scores, player2Scores }
}

export default function MatchScoreDisplay({scorePlayer1, scorePlayer2}: Props) {

  const { player1Scores, player2Scores } = calculateTennisMatchWinner({scorePlayer1, scorePlayer2});

  return (
    <>
      <div className="flex-row pr-2 border-r-2 mr-2 ">
        <div className={`${player1Scores[0].winner && "font-semibold"}`}>
          {player1Scores[0].score}
        </div>
        <div className={`${player2Scores[0].winner && "font-semibold"}`}>
          {player2Scores[0].score}
        </div>
      </div>
      <div className="flex-row">
          <div>
            {player1Scores.map((score, i) => {
              if (i>0) {
                return (
                  <span key={i} className={`pr-1 ${score.winner && "font-semibold"}`}>
                    {score.score && score.score}
                  </span>
                );
              }
            })}
          </div>
          <div>
            {player2Scores.map((score, i) => {
              if (i>0) {
                return (
                  <span key={i} className={`pr-1 ${score.winner && "font-semibold"}`}>
                    {score.score && score.score}
                  </span>
                );
              }
            })}
          </div>
      </div>
    </>
  );
  
}