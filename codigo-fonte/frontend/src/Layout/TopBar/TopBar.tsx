import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMenu, IoLogInOutline } from "react-icons/io5";

import { ButtonLink } from '../../shared/components/ButtonLink';

import styles from './TopBar.module.scss';

export const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<any>();

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("click", checkIfClickedOutside)
    return () => {
      document.removeEventListener("click", checkIfClickedOutside)
    }
  }, [setIsOpen])

  return (
    <div className={styles.topBar}>
      <nav>
        <Link to='/'><img src="./src/img/logoTop.jpeg" alt="" /></Link>
        <div ref={ref}>
            <button onClick={() => setIsOpen(!isOpen)}>
              <IoMenu />
            </button>
          {isOpen && (
            <div className={styles.topbarMenu}>
              <ButtonLink to='/entrar'>Entre <IoLogInOutline /></ButtonLink>
              <ButtonLink to='/cadastrar'>Cadastre-se</ButtonLink>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
};
