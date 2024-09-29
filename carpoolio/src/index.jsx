import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import NewTripPage from "./pages/NewTripPage.jsx";
import TripPage from "./pages/TripPage.jsx";
import "./index.css";

const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },    {
      path: "/trip/:tripId",
      element: <TripPage />,
    },
    {
      path: "/trip/create",
      element: <NewTripPage />,
    },
  ]);


const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(<RouterProvider router={router} />);

