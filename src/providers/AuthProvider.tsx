import { createContext, useContext, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type User = {
  id: number;
  username: string;
  email: string;
  image: string | null;
  role: string;
};

const AuthContext = createContext<{
  user: User | null;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  pending: boolean
}>({
  user: null,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  pending: true
});

async function getUserProfile() {
  const res = await fetch("http://localhost:3001/users/me", {
    method: "GET",
    credentials: "include"
  })

  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message);
  }

  const { data } = await res.json();
  return data
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient()

  const { data, isPending } = useQuery({
    queryKey: ["profile"],
    queryFn: getUserProfile,
    retry: false,
    staleTime: Infinity
  })

  useEffect(() => {
    const refreshAccessToken = async () => {
      if (data) {
        const response = await fetch("http://localhost:3001/authentications", {
          method: "PUT",
          credentials: "include"
        })
  
        if (!response.ok) {
          await logout()
        }
      }
    }

    const interval = setInterval(refreshAccessToken, 5 * 60 * 1000)
    return () => clearInterval(interval)
  })

  const login = async ({ email, password }: { email: string, password: string }) => {
    const response = await fetch("http://localhost:3001/authentications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include"
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }

    queryClient.invalidateQueries({ queryKey: ["profile"] })
  };

  const logout = async () => {
    await fetch("http://localhost:3001/authentications", {
      method: "DELETE",
      credentials: "include"
    })

    queryClient.invalidateQueries({ queryKey: ["profile"] })
  }

  return (
    <AuthContext.Provider value={{ user: data, login, logout, pending: isPending }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)