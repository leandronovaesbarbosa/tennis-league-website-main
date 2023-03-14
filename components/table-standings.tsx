import { Fragment } from 'react'
import Draw from './draw'
import GroupStandings from './group-standings'
import MatchScoreDisplay from './match-score-display'
import MatchDisplay from './match-score-display'

const matchesByPhase = [
  {
    phase: 'Quartas-de-final',
    matches: [
      { player1: 'André', player2: 'Pedro', status: 'Finalizada', scorePlayer1: [4, 6, 2], scorePlayer2: [6, 2, 6] },
      { player1: 'Leandro', player2: 'Felipe', status: 'A marcar', scorePlayer1: [null, null, null], scorePlayer2: [null, null, null] },
      { player1: 'Diego', player2: 'Cássio', status: 'Finalizada', scorePlayer1: [9, null, null], scorePlayer2: [6, null, null] },
    ],
  },
  {
    phase: 'Grupos',
    matches: [
      { player1: 'André', player2: 'Pedro', status: 'Finalizada', scorePlayer1: [4, 6, 2], scorePlayer2: [6, 2, 6] },
      { player1: 'Leandro', player2: 'Felipe', status: 'A marcar', scorePlayer1: [null, null, null], scorePlayer2: [null, null, null] },
      { player1: 'Diego', player2: 'Cássio', status: 'Finalizada', scorePlayer1: [9, null, null], scorePlayer2: [6, null, null] },
      { player1: 'André', player2: 'Pedro', status: 'Finalizada', scorePlayer1: [4, 6, 2], scorePlayer2: [6, 2, 6] },
      { player1: 'Leandro', player2: 'Felipe', status: 'A marcar', scorePlayer1: [null, null, null], scorePlayer2: [null, null, null] },
      { player1: 'Diego', player2: 'Cássio', status: 'Finalizada', scorePlayer1: [9, null, null], scorePlayer2: [6, null, null] },
    ],
  },
  
  // More people...
]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
const tabs = [
  { name: 'Classe A', href: '#', current: false },
  { name: 'Classe B', href: '#', current: false },
  { name: 'Classe C', href: '#', current: true },
  { name: 'Classe D', href: '#', current: false },
  { name: 'Feminino', href: '#', current: false },
]

function StandingsHeader() {
  return (
    <div className="border-b border-gray-200 pb-5 sm:pb-0">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Tabela</h3>
      <p className="mt-2 text-sm text-gray-700">
        Classificação dos grupos e das fases eliminatórias.
      </p>
      <div className="mt-3 sm:mt-4">
        <div className="sm:hidden">
          <label htmlFor="current-tab" className="sr-only">
            Select a tab
          </label>
          <select
            id="current-tab"
            name="current-tab"
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            defaultValue={tabs.find((tab) => tab.current).name}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.current
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm'
                )}
                aria-current={tab.current ? 'page' : undefined}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default function TableStandings() {
  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          {/* <h1 className="text-xl font-semibold text-gray-900">Partidas</h1>
          <p className="mt-2 text-sm text-gray-700">
            Todas as partidas do torneio para você conferir e atualizar os dados.
          </p> */}
          <StandingsHeader />
        </div>
        {/* <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Adicionar partida
          </button>
        </div> */}
      </div>
      <div className="mt-8 flow-root">
        <div className="sm:-my-2 sm:-mx-6 overflow-x-auto lg:-mx-8">
          <div className="bg-gray-50 border-t border-b py-2 px-4 text-left text-sm font-semibold text-gray-900 sm:mx-6 lg:mx-8">
            Eliminatórias
          </div>
          <div className="min-w-full py-2 align-middle sm:px-6 lg:px-8">
            
            <Draw />
            
            
            
          </div>
        </div>
        <div className="pt-8 sm:-my-2 sm:-mx-6 overflow-x-auto lg:-mx-8">
          <div className="bg-gray-50 border-t border-b py-2 px-4 text-left text-sm font-semibold text-gray-900 sm:mx-6 lg:mx-8">
            Grupos
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <GroupStandings />
            <GroupStandings />
            <GroupStandings />
            <GroupStandings />
          </div>
        </div>
      </div>
    </div>
  )
}
