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
import NotFound from "./components/NotFound";
import AdminLayout from "./routes/admin/AdminLayout";
import Dashboard from "./routes/admin/Dashboard";
import Users from "./routes/admin/Users";
import Genres from "./routes/admin/Genres";
import Series from "./routes/admin/Series";
import NewSeries from "./routes/admin/NewSeries";
import EditSeries from "./routes/admin/EditSeries";
import Chapters from "./routes/admin/Chapters";
import NewChapter from "./routes/admin/NewChapter";
import EditChapter from "./routes/admin/EditChapter";
import SingleSeries from "./routes/SingleSeries";
import SingleChapter from "./routes/SingleChapter";
import MangaList from "./routes/MangaList";
import GenreList from "./routes/GenreList";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/series/:slug",
        element: <SingleSeries />
      },
      {
        path: "/series",
        element: <MangaList />
      },
      {
        path: "/genres",
        element: <GenreList />
      },
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
      {
        path: "/:slug",
        element: <SingleChapter />
      },
      {
        path: "*",
        element: <NotFound />,
      }
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard />},
      {
        path: "/admin/series",
        element: <Series />
      },
      {
        path: "/admin/series/new",
        element: <NewSeries />
      },
      {
        path: "/admin/series/edit/:slug",
        element: <EditSeries />
      },
      {
        path: "/admin/chapters",
        element: <Chapters />
      },
      {
        path: "/admin/chapters/new",
        element: <NewChapter />
      },
      {
        path: "/admin/chapters/edit/:slug",
        element: <EditChapter />
      },
      {
        path: "/admin/users",
        element: <Users />
      },
      {
        path: "/admin/genres",
        element: <Genres />
      }
    ]
  }
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
