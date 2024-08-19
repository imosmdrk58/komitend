import Pagination from "@/components/custom/pagination";
import NotFound from "@/components/NotFound";
import SeriesList from "@/components/SeriesList";
import { getSeriesByGenre } from "@/services/serieService";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";

const SeriesByGenre = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const { data, isPending } = useQuery({
    queryKey: ["series", { genre: slug, page: searchParams.get("page") ? Number(searchParams.get("page")) : 1 }],
    queryFn: async () =>
      await getSeriesByGenre({ limit: 9, page: searchParams.get("page") ? Number(searchParams.get("page")) : 1, slug: slug! }),
    staleTime: Infinity,
    retry: false,
  });

  if (!isPending && !data) {
    return <NotFound />;
  }

  return (
    <main className="max-w-5xl m-auto flex flex-col gap-4 my-5 px-4 w-full">
      <h2 className="w-full text-2xl font-semibold text-left">
        <span className="text-[#6e6dfb]">Genre</span> {data?.genre?.name}
      </h2>

      <SeriesList series={data?.series} />
      <Pagination totalPages={data?.totalPages} />
    </main>
  );
};

export default SeriesByGenre;
