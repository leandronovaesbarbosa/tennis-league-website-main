interface Props {
  content: string;
  setContent: (content: string) => void;
}

export default function MatchesDrawToggle({content, setContent}:Props) {
  return (
    <div className="py-6">
      <span className="isolate inline-flex rounded-md shadow-sm">
        <button
          type="button"
          className={`relative inline-flex items-center rounded-l-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${content === "matches" ? "bg-indigo-700 text-white" : "bg-white hover:bg-gray-50"}`}
          onClick={() => setContent("matches")}
          disabled={content === "matches"}
        >
          Partidas
        </button>
        <button
          type="button"
          className={`relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${content === "draw" ? "bg-indigo-700 text-white" : "bg-white hover:bg-gray-50"}`}
          onClick={() => setContent("draw")}
          disabled={content === "draw"}
        >
          Tabela
        </button>
      </span>
    </div>
  )
}