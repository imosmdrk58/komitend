import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import SeriesTable from "@/components/admin/tables/SeriesTable";
import { getSeries } from "@/services/serieService";

const Series = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isPending } = useQuery({
    queryKey: [ "series",
      {
        status: searchParams.get("status") || undefined,
        page: Number(searchParams.get("page")) || 1,
        search: searchParams.get("search") || undefined
      },
    ],
    queryFn: async () =>
      await getSeries({
        status: searchParams.get("status") || undefined,
        page: Number(searchParams.get("page")) || 1,
        search: searchParams.get("search") || undefined
      }),
    retry: false,
    staleTime: Infinity,
  });

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs value={searchParams.get("status") || "all"}>
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger
              value="all"
              className="cursor-default"
              onClick={() => setSearchParams({})}
            >
              all
            </TabsTrigger>
            <TabsTrigger
              value="published"
              onClick={() => setSearchParams({ status: "published" })}
              className="cursor-default"
            >
              published
            </TabsTrigger>
            <TabsTrigger
              value="draft"
              className="cursor-default"
              onClick={() => setSearchParams({ status: "draft" })}
            >
              draft
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Button
              type="button"
              size="sm"
              className="h-8 gap-1"
              asChild
            >
              <Link to="/admin/series/new">
                <FontAwesomeIcon icon={faPlusCircle} className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Series
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </Tabs>

      <SeriesTable data={data} loading={isPending} />
    </main>
  );
};

export default Series;
