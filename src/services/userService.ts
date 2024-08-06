import apiFetch from "@/lib/apiFetch";

type GetUsersProps = {
  role?: string;
  page?: number;
};

type UpdateUserProps = {
  username: string;
  data: {
    username?: string;
    email?: string;
    password?: string;
    role?: string;
  };
};

type CreateUserProps = {
  username: string;
  email: string;
  password: string;
  role: string;
};

export async function getUsers({ role, page }: GetUsersProps) {
  const url = new URL("/users", import.meta.env.VITE_API_URL);
  if (role) url.searchParams.append("role", role);
  if (page) url.searchParams.append("page", page.toString());

  return await apiFetch(url);
}

export async function createUser(data: CreateUserProps) {
  return await apiFetch(new URL("/users", import.meta.env.VITE_API_URL), {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateUser({ username, data }: UpdateUserProps) {
  return await apiFetch(new URL(`/users/${username}`, import.meta.env.VITE_API_URL), {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteUser(username: string) {
  return await apiFetch(new URL(`/users/${username}`, import.meta.env.VITE_API_URL), {
    method: "DELETE",
    credentials: "include",
  });
}
