import Pagination from "@/components/custom/pagination";
import SeriesList from "@/components/SeriesList";
import { getBookmarks } from "@/services/bookmarkService";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const Bookmarks = () => {
  const [searchParams] = useSearchParams();
  const { data } = useQuery({
    queryKey: [
      "bookmarks",
      {
        page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
        limit: 9,
      },
    ],
    queryFn: async () =>
      await getBookmarks({
        page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
        limit: 9,
      }),
  });

  return data?.series?.length > 0 ? (
    <main className="max-w-5xl m-auto flex flex-col gap-4 my-5 px-4 w-full">
      <h2 className="w-full text-2xl font-semibold text-left">
        <span className="text-[#6e6dfb]">Bookmark</span> List
      </h2>

      <SeriesList series={data?.series} />
      <Pagination totalPages={data?.totalPages} />
    </main>
  ) : (
    <main className="w-full h-96 flex flex-col items-center justify-center text-[#444444] dark:text-[#9ca9b9]">
      <h1 className="text-3xl font-bold">Empty Bookmarks</h1>
      <p>You have no bookmarks yet, please add some</p>
    </main>
  );
};

export default Bookmarks;
