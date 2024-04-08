import { useEffect, useState } from "react";
import style from "./Cadastro.module.scss";

export function CadastroPage() {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (password && password.length < 6) {
      setErrorMessage('A senha deve ter no mínimo 6 caracteres');
    } else
      if (password && passwordConfirmation && password !== passwordConfirmation) {
        setErrorMessage('As senhas não conferem');
      } else {
        setErrorMessage('');
      }
  }, [password, passwordConfirmation]);

  return (
    <section className={style.container}>
      <h1>Cadastrar-se</h1>
      <form>
        <input type="name" placeholder="Nome*" required />
        <input type="email" placeholder="Email*" required />
        <input type="tel" placeholder="Celular" />
        <input type="password" placeholder="Repita a Senha*" required minLength={6} defaultValue={password} onChange={e => setPassword(e.target.value)} />
        <input type="password" placeholder="Repita a Senha*" required defaultValue={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} />
        <button type="submit">Enviar</button>
      </form>
      {errorMessage ? <strong>{errorMessage}.</strong> : <span>&nbsp;</span>}
    </section>
  );
}
