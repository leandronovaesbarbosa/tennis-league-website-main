const group = {
  symbol: 'A',
  players: [
    { name: 'Lindsay Walton', wins: 2, losses: 1, balance: 5 },
    { name: 'Lindsay Walton', wins: 2, losses: 1, balance: 5 },
    { name: 'Lindsay Walton', wins: 2, losses: 1, balance: 5 },
    { name: 'Lindsay Walton', wins: 2, losses: 1, balance: 5 },
  ]
};

export default function GroupStandings() {
  return (
    <div className="">
      <div className="mt-3 flow-root">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr className="divide-x divide-gray-200">
                  <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900">
                    Grupo {group.symbol}
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                    V
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                    D
                  </th>
                  <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900">
                    SG
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {group.players.map((person, i) => (
                  <tr key={i} className="divide-x divide-gray-200">
                    <td className="whitespace-nowrap py-3 pl-4 pr-4 text-sm font-medium text-gray-900">
                      {person.name}
                    </td>
                    <td className="whitespace-nowrap py-3 px-4 text-sm text-gray-500">{person.wins}</td>
                    <td className="whitespace-nowrap py-3 px-4 text-sm text-gray-500">{person.losses}</td>
                    <td className="whitespace-nowrap py-3 pl-4 pr-4 text-sm text-gray-500">{person.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
