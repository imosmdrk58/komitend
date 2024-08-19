import Pagination from '@/components/custom/pagination'
import SeriesList from '@/components/SeriesList'
import { getSeries } from '@/services/serieService'
import { useQuery } from '@tanstack/react-query'
import { useParams, useSearchParams } from 'react-router-dom'

const SearchSeries = () => {
  const { query } = useParams()
  const [searchParams] = useSearchParams();

  const { data } = useQuery({
    queryKey: ["series", { search: query, status: "published", page: searchParams.get("page") ? Number(searchParams.get("page")) : 1 }],
    queryFn: async () => await getSeries({ search: query, status: "published", page: searchParams.get("page") ? Number(searchParams.get("page")) : 1 }),
    retry: false,
    staleTime: Infinity
  })

  return (
    <main className="max-w-5xl m-auto flex flex-col gap-4 my-5 px-4 w-full">
      <h2 className="w-full text-2xl font-semibold text-left">
        <span className="text-[#6e6dfb]">Search</span> {query?.toWellFormed()}
      </h2>

      <SeriesList series={data?.data} />
      <Pagination totalPages={data?.totalPages} />
    </main>
  )
}

export default SearchSeries