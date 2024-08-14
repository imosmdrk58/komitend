import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getGenres } from "@/services/genreService";

import { Button } from "@/components/ui/button";
import GenreForm from "@/components/admin/forms/GenreForm";
import GenresTable from "@/components/admin/tables/GenresTable";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Genres = () => {
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(false)

  const { data, isPending } = useQuery({
    queryKey: ["genres", { page: Number(searchParams.get("page")) || 1, search: searchParams.get("search") || undefined }],
    queryFn: async () => await getGenres({ page: Number(searchParams.get("page")) || 1, search: searchParams.get("search") || undefined }),
    retry: false,
    staleTime: Infinity
  })

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs value="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all" className="cursor-default">
              all
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Button
              type="button"
              size="sm"
              className="h-8 gap-1"
              onClick={() => setOpen(true)}
            >
              <FontAwesomeIcon icon={faPlusCircle} className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Genre
              </span>
            </Button>
          </div>
        </div>
      </Tabs>

      <GenresTable data={data} loading={isPending} />
      <GenreForm open={open} onClose={() => setOpen(false)}/>
    </main>
  )
}

export default Genres