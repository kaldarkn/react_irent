import { useState } from 'react';
import axios from 'axios';
import styles from './Login.module.scss';

const REG_VALID = {
  email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
  password: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,}$/,
};

function Login() {
  let [state, setState] = useState({ email: '', password: '' });
  let [error, setError] = useState({ email: '', password: '' });

  const handleOnChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleOnBlur = (e) => {
    if (state[e.target.name] === '') {
      setError({ ...error, [e.target.name]: `Поле ${e.target.name} не может быть пустым` });
    } else {
      if (REG_VALID[e.target.name].test(state[e.target.name])) {
        setError({ ...error, [e.target.name]: '' });
      } else {
        setError({ ...error, [e.target.name]: `Некорректно введён ${e.target.name}` });
      }
    }
  };

  //Еще не дописал (пока тестирую).
  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post('http://irental.ddns.net/login', { ...state })
      .then((response) => console.log(response));
  };

  return (
    <form>
      <h1>Вход в личный кабинет</h1>
      <input
        value={state.email}
        onChange={(event) => handleOnChange(event)}
        onBlur={(event) => handleOnBlur(event)}
        autoComplete="off"
        name="email"
        placeholder="Введите email"
      />
      <span>{error.email}</span>
      <input
        value={state.password}
        onChange={(event) => handleOnChange(event)}
        onBlur={(event) => handleOnBlur(event)}
        autoComplete="off"
        name="password"
        placeholder="Введите пароль"
      />
      <span>{error.password}</span>
      <button onClick={(e) => submitForm(e)}>Войти</button>
    </form>
  );
}

export default Login;
