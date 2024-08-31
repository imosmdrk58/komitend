import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

const SeriesList = ({ series }: any) => {
  return (
<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {series?.map((serie: any) => (
          <li className="w-full max-h-72 md:max-h-56 rounded-md bg-gray-100 dark:bg-[#1d1e23] border-2 dark:border-[#21222d] border-gray-200 shadow-sm relative overflow-hidden flex">
            <Link to={`/series/${serie?.slug}`} className="w-1/2 h-full relative">
              <img src={serie?.imageUrl} className="w-full h-full" />
              <div className="w-full absolute bg-black bg-opacity-50 text-white font-semibold bottom-0 px-4 py-2">
                {serie?.title}
              </div>
            </Link>
            <div className="flex flex-col w-1/2 h-full">
              <div className="flex justify-center items-center py-3 text-sm bg-gray-300 dark:bg-black font-semibold dark:text-red-400 text-red-600">
                {serie?.seriesType?.toUpperCase()}
              </div>
              <div className="flex justify-center items-center py-2 text-xs bg-gray-200 dark:bg-[#21222d] dark:text-[#9ca9b9] gap-1">
                <FontAwesomeIcon icon={faStar} color="#ffdd73" />
                <span className="pt-3/4">{serie?.rating}</span>
              </div>

              <div className="h-full text-xs overflow-y-scroll p-2 scrollbar-thin dark:scrollbar-track-[#21222d] dark:scrollbar-thumb-[#9ca9b9]">
                {serie?.description}
              </div>

              <div className="bg-gray-300 dark:bg-black p-3 text-xs text-wrap flex flex-wrap items-center justify-center gap-0.5 md:hidden">
                {serie?.genres?.map((genre: any, index: number) => (
                  <span>
                    <Link
                      to={`/genres/${genre.slug}`}
                      className="dark:text-[#9ca9b9] hover:text-[#6e6dfb] transition-colors"
                      key={genre.id}
                    >
                      {genre.name}
                    </Link>
                    {index !== serie?.genres?.length - 1 && `,`}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
  )
}

export default SeriesList