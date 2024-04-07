import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./error.page";

export const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
  },
]);
