import { getAllSeries } from "@/services/serieService"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom";

const alphabetUpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const MangaList = () => {
  const { data } = useQuery({
    queryKey: ["series", { key: "manga-list" }],
    queryFn: async () => await getAllSeries(),
    retry: false,
    staleTime: Infinity
  })

  return (
    <main className="max-w-5xl mx-auto p-2">
      <h2 className="w-full py-4 text-2xl font-semibold text-left">
        <span className="text-[#3453d1]">Manga</span> List
      </h2>
      <ul className="flex justify-center pb-4 flex-wrap border-b-4 border-[#6e6dfb]">
        {alphabetUpperCase.map((letter) => (
          <Link
            key={letter}
            to={`#${letter}`}
            className="px-3 py-2 text-[#444444] dark:text-[#9ca9b9] hover:bg-[#6e6dfb] hover:text-white rounded-md transition-colors"
          >
            <li>{letter}</li>
          </Link>
        ))}
      </ul>

      <ul className="p-2 flex gap-2 flex-col">
        {alphabetUpperCase.map((letter) => {
            const filtered = data?.filter((value: any) => {
                return value.title.toUpperCase().startsWith(letter)
            })

            if (filtered?.length < 1) return null

            return (
                <li
                  className="flex gap-10 pb-4 border-b-2 border-dashed dark:border-[#45475a]"
                  key={letter}
                  id={letter}
                >
                  <div className="text-xl flex justify-center items-center bg-gray-200 dark:bg-[#45475a] dark:text-white rounded-md w-12 h-12">
                    {letter}
                  </div>
                  <ul className="list-[square]">
                    {filtered?.reverse().map((item: any) => (
                        <li className="text-red-500" key={item?.id}>
                        <Link
                          to={`/series/${item.slug}`}
                          className="text-[#666666] hover:text-black dark:text-[#9ca9b9] dark:hover:text-white transition-colors"
                        >
                          {item?.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              )
        })}
      </ul>
    </main>
  )
}

export default MangaList