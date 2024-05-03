import styles from './Home.module.scss'
import { TopBar } from './Layout/TopBar/TopBar'


export const HomePage = () => (
  <header className={styles.header}>
    <TopBar />
    <small>Agenda</small>
    <strong>ONLINE</strong>
    <h1 translate='no'>Kezuka Style's</h1>
  </header>
)
