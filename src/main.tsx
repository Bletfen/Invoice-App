import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "./layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Invoices from "./pages/Invoices";
import Invoice from "./pages/Invoice";
import InvoicesProvider from "./context/InvoicesContext";
import EditandNewInvoice from "./pages/EditandNewInvoice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Invoices />,
        children: [
          {
            path: "create-new-invoice",
            element: <EditandNewInvoice />,
          },
        ],
      },

      {
        path: "/:id",
        element: <Invoice />,
        children: [
          {
            path: "edit",
            element: <EditandNewInvoice />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <InvoicesProvider>
      <RouterProvider router={router} />
    </InvoicesProvider>
  </StrictMode>
);
