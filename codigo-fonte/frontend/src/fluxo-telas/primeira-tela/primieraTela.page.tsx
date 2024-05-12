import style from "./primeiraTela.module.scss";

export function PrimeiraTela() {
  return (
    <section className={style.container}>
      <div className={style.title}>
        <h1>Agenda</h1>
        <h2>ONLINE</h2>
        <img src="./src/img/logo.jpeg" alt="" />
      </div>
      <a href="#">AGENDAR</a>
    </section>
  );
}