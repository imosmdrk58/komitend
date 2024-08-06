export default async function apiFetch(url: string | URL, options?: RequestInit) {
    const res = await fetch(url, {
        ...options,
        headers: {
            ...options?.headers,
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
    }

    const { data } = await res.json();
    return data;
}