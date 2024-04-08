import { Link, LinkProps } from "react-router-dom";
import { PropsWithChildren, RefAttributes } from "react";

import style from './ButtonLink.module.scss'

interface ButtonLinkProps extends LinkProps, RefAttributes<HTMLAnchorElement> {}

export function ButtonLink({ children, to, ...props }: PropsWithChildren<ButtonLinkProps>) {
  return <Link to={to} {...props} className={style.buttonLink}>{children}</Link>
}
