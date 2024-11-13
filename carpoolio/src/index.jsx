import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import NewTripPage from "./pages/NewTripPage.jsx";
import TripPage from "./pages/TripPage.jsx";
import NewTripForm from "./pages/NewTripForm.jsx";
import "./index.css";
import { TripContextProvider } from "@components/TripContext"; // Adjust path if needed

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/trip/:tripId",
    element: <TripPage />,
  },
  {
    path: "/trip/:tripId/:adminId",
    element: <TripPage />,
  },
  {
    path: "/trip/create",
    element: <NewTripForm />,
  },
]);

const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(
  <TripContextProvider>
    <RouterProvider router={router} />
  </TripContextProvider>
);
