import apiFetch from "@/lib/apiFetch";

type GetChaptersProps = {
  status?: string;
  page?: number;
  search?: string;
};

type CreateChapterArgs = {
  title: string;
  chapter: string;
  content: string;
  status: string;
  serieId: number;
};

type UpdateChapterArgs = {
  id: number
  title?: string;
  chapter?: string;
  content?: string;
  status?: string;
  serieId?: number;
};

export async function getChapters({ status, page = 1, search }: GetChaptersProps) {
  const url = new URL("/chapters", import.meta.env.VITE_API_URL);
  if (status) url.searchParams.append("status", status);
  if (page) url.searchParams.append("page", page.toString());
  if (search) url.searchParams.append("search", search);

  return await apiFetch(url);
}

export async function getChapter(slug: string) {
  const url = new URL(`/chapters/${slug}`, import.meta.env.VITE_API_URL);
  return await apiFetch(url);
}

export async function createChapter(data: CreateChapterArgs) {
  const url = new URL("/chapters", import.meta.env.VITE_API_URL);

  return await apiFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateChapter(data: UpdateChapterArgs) {
  const url = new URL(`/chapters/${data.id}`, import.meta.env.VITE_API_URL);

  return await apiFetch(url, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteChapter(id: number) {
  const url = new URL(`/chapters/${id}`, import.meta.env.VITE_API_URL);

  return await apiFetch(url, {
    method: "DELETE",
  });
}