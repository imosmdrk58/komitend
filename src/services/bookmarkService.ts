import apiFetch from "@/lib/apiFetch";

export async function getBookmarks({ page = 1, limit = 9 }: { page: number; limit: number }) {
    const url = new URL("/bookmarks", import.meta.env.VITE_API_URL);

    if (limit) url.searchParams.append("limit", limit.toString());
    if (page) url.searchParams.append("page", page.toString());

    return await apiFetch(url);
}

export async function createBookmark(serieId: number) {
    const url = new URL("/bookmarks", import.meta.env.VITE_API_URL);

    return await apiFetch(url, {
        method: "POST",
        body: JSON.stringify({ serieId }),
    });
}

export async function deleteBookmark(serieId: number) {
    const url = new URL(`/bookmarks/${serieId}`, import.meta.env.VITE_API_URL);

    return await apiFetch(url, {
        method: "DELETE",
    });
}