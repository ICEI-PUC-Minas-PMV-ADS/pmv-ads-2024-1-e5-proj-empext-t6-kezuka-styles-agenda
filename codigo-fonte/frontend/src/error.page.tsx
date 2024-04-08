import { FaChevronLeft } from "react-icons/fa";
import { useRouteError } from "react-router-dom";
import { ButtonLink } from "./shared/components/ButtonLink";

import style from './Error.module.scss'

declare interface ErrorType {
  data: string,
  error: {
    message: string,
    stack: string
  },
  internal: boolean,
  status: number,
  statusText: string
}

export function ErrorPage() {
  const error: ErrorType | any = useRouteError();

  return (
    <div id="error-page">
      {error && error.status === 404 ? (
        <>
          <h1>404</h1>
          <p>A página que você está procurando não existe...</p>
        </>
      ) : (
        <>
          <h1>Oops!</h1>
          <p>Foi mal... algo deu errado.</p>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
        </>
      )}
      <ButtonLink to='/'><a className={style.backButton}><FaChevronLeft />Volte para o início</a></ButtonLink>
    </div>
  );
}
