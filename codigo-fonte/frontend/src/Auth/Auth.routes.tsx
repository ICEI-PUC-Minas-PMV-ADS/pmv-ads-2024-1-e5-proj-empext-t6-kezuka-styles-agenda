import { RouteObject } from "react-router-dom";

import { CadastroPage } from "./Cadastro/Cadastro.page";
import { LoginPage } from "./Login/Login.page";

export const authRouter: RouteObject[] = [
  {
    path: 'entrar',
    element: <LoginPage />,
  },
  {
    path: 'cadastrar',
    element: <CadastroPage />,
  },
];
