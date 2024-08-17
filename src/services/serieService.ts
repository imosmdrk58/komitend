import apiFetch from "@/lib/apiFetch";

type GetSeriesProps = {
  status?: string;
  page?: number;
  search?: string;
};

type CreateSerieArgs = {
  title: string;
  description?: string;
  image?: string | null;
  status: string;
  seriesStatus: string;
  seriesType: string;
  alternative?: string;
  author?: string;
  artist?: string;
  serialization?: string;
  released?: string;
  rating?: string;
  genres?: string[];
};

type UpdateSerieArgs = {
  id: number
  title?: string;
  description?: string;
  image?: string;
  imageUrl?: string;
  status: string;
  seriesStatus: string;
  seriesType: string;
  alternative?: string;
  author?: string;
  artist?: string;
  serialization?: string;
  released?: string;
  rating?: string;
  genres?: string[];
};

export async function getAllSeries() {
  const url = new URL("/series/all", import.meta.env.VITE_API_URL);
  return await apiFetch(url);
}

export async function getLatestUpdate({ page = 1, limit = 9 }: { page?: number; limit?: number }) {
  const url = new URL("/series/latest", import.meta.env.VITE_API_URL);
  if (limit) url.searchParams.append("limit", limit.toString());
  if (page) url.searchParams.append("page", page.toString());

  return await apiFetch(url);
}

export async function getSeries({ status, page = 1, search }: GetSeriesProps) {
  const url = new URL("/series", import.meta.env.VITE_API_URL);
  if (status) url.searchParams.append("status", status);
  if (page) url.searchParams.append("page", page.toString());
  if (search) url.searchParams.append("search", search);

  return await apiFetch(url);
}

export async function getSerie(slug: string) {
  const url = new URL(`/series/${slug}`, import.meta.env.VITE_API_URL);
  return await apiFetch(url);
}

export async function createSerie(data: CreateSerieArgs) {
  const url = new URL("/series", import.meta.env.VITE_API_URL);

  return await apiFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateSerie(data: UpdateSerieArgs) {
  const url = new URL(`/series/${data.id}`, import.meta.env.VITE_API_URL);

  return await apiFetch(url, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteSerie(id: number) {
  const url = new URL(`/series/${id}`, import.meta.env.VITE_API_URL);

  return await apiFetch(url, {
    method: "DELETE",
  });
}