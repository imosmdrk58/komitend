import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";

import RootLayout from "@/routes/RootLayout";
import Home from "@/routes/Home";
import Register from "@/routes/auth/Register";
import { Toaster } from "./components/ui/sonner";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/register",
        element: <Register />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
