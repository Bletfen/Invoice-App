import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "./layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Invoices from "./pages/Invoices";
import Invoice from "./pages/Invoice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Invoices />,
      },
      {
        path: "/:id",
        element: <Invoice />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
