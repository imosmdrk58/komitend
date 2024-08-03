import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";

import RootLayout from "@/routes/RootLayout";
import Home from "@/routes/Home";
import Register from "@/routes/auth/Register";
import { Toaster } from "@/components/ui/sonner";
import Login from "@/routes/auth/Login";
import { AuthProvider } from "./providers/AuthProvider";
import Profile from "./routes/Profile";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <RouterProvider router={router} />
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
  </React.StrictMode>
);
