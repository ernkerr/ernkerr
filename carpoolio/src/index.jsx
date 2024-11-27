import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TripContextProvider } from "@components/TripContext"; // Adjust path if needed

import HomePage from "./pages/HomePage.jsx";
import TripPage from "./pages/TripPage.jsx";
import NewTripForm from "@components/NewTripForm/NewTripForm.jsx";
import "./index.css";

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
