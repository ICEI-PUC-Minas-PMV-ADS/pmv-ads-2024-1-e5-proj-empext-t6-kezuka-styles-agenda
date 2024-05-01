import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import { HomePage } from "./Home.page";
import { ErrorPage } from "./error.page";
import { authRouter } from "./Auth/Auth.routes";
import SelectProfessionalPage from "./SelectProfessional/SelectProfessionalPage"
export const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "select-professional",  
        element: <SelectProfessionalPage />
      },
      {
        path: "user/:userId", 
        element: <p>Olá!</p>
      },
      ...authRouter  
    ]
  },
]);
