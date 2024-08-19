import NotFound from "@/components/NotFound";
import { cn, formatDate } from "@/lib/utils";
import { getChapter } from "@/services/chapterService";
import { getSerie } from "@/services/serieService";
import {
  faArrowLeft,
  faArrowRight,
  faBookOpen,
  faList,
  faMessage,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const SingleChapter = () => {
  const [open, setOpen] = useState(false);
  const { slug } = useParams();

  const { data: chapter } = useQuery({
    queryKey: ["chapters", { slug: slug! }],
    queryFn: async () => await getChapter(slug!),
    retry: false,
    staleTime: Infinity,
  });

  const { data: serie } = useQuery({
    queryKey: ["series", { slug: chapter?.serie?.slug }],
    queryFn: async () => await getSerie(chapter!.serie.slug),
    retry: false,
    enabled: !!chapter?.serie?.slug,
    staleTime: Infinity,
  });

  if (!chapter || !serie) {
    return <NotFound />;
  }

  const currentChapter = serie?.chapters?.find(
    (c: any) => c.id === chapter?.id
  );
  const next =
    serie?.chapters[serie?.chapters?.indexOf(currentChapter as number) - 1];
  const prev =
    serie?.chapters[serie?.chapters?.indexOf(currentChapter as number) + 1];

  return (
    <main className="max-w-5xl mx-auto p-2">
      <h1 className="text-2xl font-bold mt-2 mb-4 text-center">
        {chapter?.title}
      </h1>

      <div className="p-3 flex items-center justify-between gap-4 bg-[#343543] text-[#9ca9b9] rounded-md">
        <div className="flex gap-4 items-center">
          <img
            alt=""
            src={serie?.imageUrl || ""}
            width={100}
            height={100}
            className="rounded-md w-16 h-16 border border-[#9ca9b9]"
          />
          <div className="flex flex-col">
            <span className="text-md font-semibold">{chapter?.title}</span>
            <div className="text-xs flex gap-2">
              <span>{`Chapter ${chapter?.chapter}`}</span>
              <span>•</span>
              <span>{formatDate(chapter?.createdAt)}</span>
            </div>
          </div>
        </div>
        <div className="flex pl-4 gap-2">
          <button
            className="bg-[#2f303e] text-[#eeeeee] px-[10px] py-[5px] rounded-sm cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <FontAwesomeIcon icon={faList} />
          </button>
          <Link
            to={prev ? `/${prev.slug}` : "#"}
            className={cn(
              "bg-[#45475a] text-[#eeeeee] px-[10px] py-[5px] rounded-sm cursor-pointer",
              !prev && "cursor-not-allowed opacity-25 hover:none",
              prev && "hover:bg-[#6e6dfb] hover:text-white"
            )}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <Link
            to={next ? `/${next.slug}` : "#"}
            className={cn(
              "bg-[#45475a] text-[#eeeeee] px-[10px] py-[5px] rounded-sm cursor-pointer",
              !next && "cursor-not-allowed opacity-25 hover:none",
              next && "hover:bg-[#6e6dfb] hover:text-white"
            )}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </div>

      <div className="max-w-5xl flex flex-col items-center my-5">
        <div className="flex flex-col w-full max-w-2xl items-center">
          {chapter?.content?.map((image: any, index: number) => (
            <img
              key={index}
              src={image}
              alt=""
              className="w-full h-auto"
              width={300}
              height={300}
            />
          ))}
        </div>
      </div>

      <div className="p-3 flex items-center justify-between gap-4 bg-[#343543] text-[#9ca9b9] rounded-md">
        <div className="flex gap-4 items-center">
          <img
            alt=""
            src={serie?.imageUrl || ""}
            width={100}
            height={100}
            className="rounded-md w-16 h-16 border border-[#9ca9b9]"
          />
          <div className="flex flex-col">
            <span className="text-md font-semibold">{chapter?.title}</span>
            <div className="text-xs flex gap-2">
              <span>{`Chapter ${chapter?.chapter}`}</span>
              <span>•</span>
              <span>{formatDate(chapter?.createdAt)}</span>
            </div>
          </div>
        </div>
        <div className="flex pl-4 gap-2">
          <button
            className="bg-[#2f303e] text-[#eeeeee] px-[10px] py-[5px] rounded-sm cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <FontAwesomeIcon icon={faList} />
          </button>
          <Link
            to={prev ? `/${prev.slug}` : "#"}
            className={cn(
              "bg-[#45475a] text-[#eeeeee] px-[10px] py-[5px] rounded-sm cursor-pointer",
              !prev && "cursor-not-allowed opacity-25 hover:none",
              prev && "hover:bg-[#6e6dfb] hover:text-white"
            )}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <Link
            to={next ? `/${next.slug}` : "#"}
            className={cn(
              "bg-[#45475a] text-[#eeeeee] px-[10px] py-[5px] rounded-sm cursor-pointer",
              !next && "cursor-not-allowed opacity-25 hover:none",
              next && "hover:bg-[#6e6dfb] hover:text-white"
            )}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-2 my-5">
        <h2 className="w-full py-4 text-2xl font-semibold text-left flex gap-2 items-center">
          <FontAwesomeIcon icon={faMessage} fill="#6e6dfb" color="#6e6dfb" />{" "}
          Comments
        </h2>
        {/* <DiscussionEmbed
          shortname="komikgan-1"
          config={{
            url: `https://eeae-104-28-251-244.ngrok-free.app/series/${chapter?.slug}`,
            identifier: chapter?.slug,
            title: chapter?.title,
            language: "id_ID",
          }}
        /> */}
      </div>

      <div
        className={cn(
          "fixed left-0 top-0 h-screen w-72 bg-[#3b3c4c] z-20 shadow-xl shadow-gray-800 transition",
          { "-translate-x-full": !open }
        )}
      >
        <div className="p-2 border-b-4 border-[#6e6dfb] flex justify-between items-center">
          <h1 className="text-lg font-bold">Chapter List</h1>
          <button
            onClick={() => setOpen(false)}
            className="hover:text-[#6e6dfb] transition-colors"
          >
            <FontAwesomeIcon icon={faX} strokeWidth={6} />
          </button>
        </div>
        <ul className="flex flex-col gap-1 h-[94%] overflow-y-auto scrollbar-thin scrollbar-thumb-[#6e6dfb] scrollbar-track-[#3b3c4c] pr-1">
          {serie?.chapters?.map((chapter: any) => (
            <Link to={`/${chapter.slug}`} key={chapter.id}>
              <li
                className={cn(
                  "bg-[#3b3c4c] flex gap-2 p-1 items-center py-2 border-dashed border-b-2 border-[#45475a] hover:text-[#6e6dfb]",
                  "params.slug" === chapter.slug
                    ? "text-[#6e6dfb]"
                    : "text-[#9ca9b9]"
                )}
              >
                <div className="p-3 bg-[#48495b] rounded-lg">
                  <FontAwesomeIcon icon={faBookOpen} color="#eeeeee" />
                </div>
                <div className="flex flex-col">
                  <p className="text-base">Chapter {chapter.chapter}</p>
                  <p className="text-xs">
                    {new Date(chapter.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default SingleChapter;
