import { useState } from 'react';
import style from './Login.module.scss';

function Login() {
  let [email, setEmail] = useState('');
  let [emailError, setEmailError] = useState('');
  let [password, setPassword] = useState('');
  let [passwordError, setPasswordError] = useState('');

  const handleOnChange = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value);
        break;

      case 'password':
        setPassword(e.target.value);
        break;
      default:
    }
  };

  const handleOnBlur = (e) => {
    switch (e.target.name) {
      case 'email':
        if (email === '') {
          setEmailError('Поле email не может быть пустым');
        } else {
          if (/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email)) {
            setEmailError('');
          } else {
            setEmailError('Некорректно введён email');
          }
        }
        break;

      case 'password':
        if (password === '') {
          setPasswordError('Поле пароля не может быть пустым');
        } else {
          //Регулярка: Хоть одна цифра
          //Хоть одна латиница в верхнем регистре
          //Хоть одна латиница в нижнем регистре
          //Во всей строке не допускаются пробелы
          //Не менее 8 символов
          if (/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,}$/.test(e.target.value)) {
            setPasswordError('');
          } else {
            setPasswordError(
              'Длина пароля не менее 8 символов. Обязательно должен включать латиницу в верхнем и нижнем регистре и цифры. Без пробелов',
            );
          }
        }
        break;
      default:
    }
  };

  return (
    <form>
      <h1>Вход в личный кабинет</h1>
      <input
        value={email}
        onChange={(event) => handleOnChange(event)}
        onBlur={(event) => handleOnBlur(event)}
        autoComplete="off"
        name="email"
        placeholder="Введите email"
      />
      <span>{emailError}</span>
      <input
        value={password}
        onChange={(event) => handleOnChange(event)}
        onBlur={(event) => handleOnBlur(event)}
        autoComplete="off"
        name="password"
        placeholder="Введите пароль"
      />
      <span>{passwordError}</span>
      <button>Войти</button>
    </form>
  );
}

export default Login;
