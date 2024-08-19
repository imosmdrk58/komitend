import apiFetch from "@/lib/apiFetch";

export async function getAllGenres() {
    const url = new URL("/genres/all", import.meta.env.VITE_API_URL);
    return await apiFetch(url);
}

export async function getGenres({ page, search }: { page: number, search?: string }) {
    const url = new URL("/genres", import.meta.env.VITE_API_URL);
    url.searchParams.append("page", page.toString());
    if (search) url.searchParams.append("search", search);
    return await apiFetch(url);
}

export async function createGenre(name: string) {
    const url = new URL("/genres", import.meta.env.VITE_API_URL);
    return await apiFetch(url, {
        method: "POST",
        body: JSON.stringify({ name }),
    });
}

export async function updateGenre({ id, name }: { id: number, name: string }) {
    const url = new URL(`/genres/${id}`, import.meta.env.VITE_API_URL);
    return await apiFetch(url, {
        method: "PATCH",
        body: JSON.stringify({ name }),
    });
}

export async function deleteGenre(id: number) {
    const url = new URL(`/genres/${id}`, import.meta.env.VITE_API_URL);
    return await apiFetch(url, {
        method: "DELETE",
    });
}