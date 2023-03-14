import React from 'react';
import MatchCard from './match-card';

const Draw = () => {

  // grid grid-cols-1 sm:grid-cols-3 
  
  return (
    <div className="flex flex-col-reverse sm:flex-row items-center gap-4"> 
      <div id="quarter" className="w-full">
        <div className="grid grid-row-4 gap-4 w-full">
          <span className="text-center text-sm text-gray-500">Quartas de final</span>
          <div id="q1">
            <MatchCard />
          </div>
          <div id="q2"><MatchCard /></div>
          <div id="q3"><MatchCard /></div>
          <div id="q4"><MatchCard /></div>
        </div>
      </div>
      <div id="semi" className="w-full">
        <div className="grid grid-row-2 gap-4">
          <span className="text-center text-sm text-gray-500">Semi-finais</span>
          <div id="s1"><MatchCard /></div>
          <div id="s2"><MatchCard /></div>
        </div>
      </div>
      <div id="final" className="w-full">
        <div className="grid grid-row-1 gap-4">
          <span className="text-center text-sm text-gray-500">Final</span>
          <div id="f1"><MatchCard /></div>
        </div>
      </div>

    </div>
  );
};

export default Draw;
