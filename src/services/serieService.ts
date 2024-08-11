import apiFetch from "@/lib/apiFetch";

type GetSeriesProps = {
    status?: string;
    page?: number;
  };

export async function getSeries({ status, page = 1 }: GetSeriesProps) {
    const url = new URL("/series", import.meta.env.VITE_API_URL);
    if (status) url.searchParams.append("status", status);
    if (page) url.searchParams.append("page", page.toString());
  
    return await apiFetch(url);
  }