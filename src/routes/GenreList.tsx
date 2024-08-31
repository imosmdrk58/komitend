import { getAllGenres } from "@/services/genreService"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"

const GenreList = () => {
  const { data } = useQuery({
    queryKey: ["genres", { key: "genre-list" }],
    queryFn: async () => await getAllGenres(),
    retry: false,
    staleTime: Infinity
  })

  return (
    <main className="max-w-5xl mx-auto p-2 mb-10">
      <h2 className="w-full py-4 text-2xl font-semibold text-left">
        <span className="text-[#3453d1]">Genre</span> List
      </h2>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {data?.map((genre: any) => (
          <li key={genre?.id}>
            <Link
              to={`/genres/${genre?.slug}`}
              className="flex justify-between items-center p-3 bg-gray-200 dark:text-[#9ca9b9] dark:bg-[#3b3c4c] hover:text-white hover:bg-[#6e6dfb] transition-colors rounded-md"
            >
              <span>{genre?.name}</span>
              <span>{genre?.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default GenreList