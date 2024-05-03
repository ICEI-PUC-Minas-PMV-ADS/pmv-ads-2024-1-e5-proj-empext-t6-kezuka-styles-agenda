import { RouteObject } from "react-router-dom";

import { ExibirServicos } from "./Exibir/ExibirServicos.page";
import { EditarServicos } from "./Editar/EditarServicos.page";

export const servicosRouter : RouteObject[] = [
    {
        path: 'servicos',
        element: <ExibirServicos/>,
    }, 
    {
        path: 'editar-servicos',
        element: <EditarServicos/>
    },
]