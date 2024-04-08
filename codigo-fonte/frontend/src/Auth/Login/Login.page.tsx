import style from "./Login.module.scss";

export function LoginPage() {
  return (
    <section className={style.container}>
      <h1>Login</h1>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Senha" />
        <button type="submit">Entrar</button>
      </form>
    </section>
  );
}
