import Pagination from "@/components/custom/pagination";
import { formatRelativeTime } from "@/lib/utils";
import { getLatestUpdate } from "@/services/serieService";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";

const Home = () => {
  const [searchParams] = useSearchParams();
  const { data } = useQuery({
    queryKey: [
      "series",
      {
        key: "latest-update",
        page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
      },
    ],
    queryFn: async () =>
      await getLatestUpdate({
        limit: 9,
        page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
      }),
  });

  return (
    <main>
      <div className="max-w-5xl m-auto flex flex-col gap-4 my-5 px-4 w-full">
        <div className="flex justify-between">
          <h2 className="w-full text-2xl font-semibold text-left">
            <span className="text-[#6e6dfb]">Latest</span> Update
          </h2>
        </div>

        <div className="flex flex-col justify-center gap-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.data?.map((serie: any) => (
              <div
                className="pb-4 border-b-2 border-dashed border-[#45475a] flex w-full h-auto gap-2"
                key={serie.id}
              >
                <Link
                  to={`/series/${serie.slug}`}
                  className="w-24 h-36 border-2 rounded-md border-[#45475a] flex-none overflow-hidden relative"
                >
                  <img
                    src={serie.imageUrl}
                    alt={serie.title}
                    className="hover:scale-125 transition-all object-fill w-full h-full"
                  />
                </Link>
                <div className="w-full h-full truncate ml-2">
                  <Link
                    to={`/series/${serie.slug}`}
                    className="text-[16px] font-semibold hover:text-[#6e6dfb] transition-colors"
                  >
                    {serie.title}
                  </Link>
                  <ul className="grid grid-cols-1 gap-1 mt-2">
                    {serie?.chapters?.map((chapter: any) => (
                      <li className="flex justify-between" key={chapter.id}>
                        <Link
                          to={`/${chapter.slug}`}
                          className="px-4 py-1 text-[15px] text-[#eeeeee] bg-[#3b3c4c] rounded-full hover:bg-[#6e6dfb] hover:text-[#ffffff] transition-colors"
                        >
                          Chapter {chapter.chapter}
                        </Link>
                        <span className="text-[14px] text-[#999999] font-light p-[3px]">
                          {formatRelativeTime(chapter.createdAt)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <Pagination totalPages={data?.totalPages} />
        </div>
      </div>
    </main>
  );
};

export default Home;
