import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

type User = {
  id: number;
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
}>({
  user: null,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cookies] = useCookies(["accessToken", "refreshToken"]);

  useEffect(() => {
    if (cookies.accessToken) {
      const decoded = jwtDecode(cookies.accessToken) as User
      setUser(decoded)
    }

    if ((!cookies.accessToken || cookies.accessToken === "") || (!cookies.refreshToken || cookies.refreshToken === "")) {
        return;
      }
  }, [setUser, cookies])

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

    const { data } = await response.json();

    const decoded = jwtDecode(data.accessToken) as User
    setUser(decoded)

    return;
  };

  const logout = async () => {
    const response = await fetch("http://localhost:3001/authentications", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        refreshToken: cookies.refreshToken
      }),
      credentials: "include"
    })

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }

    setUser(null)
    return;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)