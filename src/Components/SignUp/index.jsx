import { useEffect, useState } from 'react';
import IMask from 'imask';
import styles from './Signup.module.scss';

const REG_VALID = {
  email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
  password: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,}$/,
  name: /^[А-ЯЁа-яё]*$|^[А-ЯЁа-яё][А-ЯЁа-яё ]*[А-ЯЁа-яё]$/,
  surname: /^[А-ЯЁа-яё]*$|^[А-ЯЁа-яё][А-ЯЁа-яё ]*[А-ЯЁа-яё]$/,
  lastname: /^[А-ЯЁа-яё]*$|^[А-ЯЁа-яё][А-ЯЁа-яё ]*[А-ЯЁа-яё]$/,
  tel: /^[+][0-9] [(][0-9]{3}[)] [0-9]{3}[-][0-9]{2}[-][0-9]{2}$/,
};

const Signup = () => {
  let [state, setState] = useState({
    name: '',
    surname: '',
    lastname: '',
    email: '',
    tel: '',
    password: '',
    passwordRepeat: '',
  });

  let [error, setError] = useState({
    name: '',
    surname: '',
    lastname: '',
    email: '',
    tel: '',
    password: '',
    passwordRepeat: '',
  });

  useEffect(() => {
    IMask(document.getElementById('tel'), {
      mask: '+{7} (000) 000-00-00',
    });
  }, []);

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

  const handleOnBlurPwdRepeat = () => {
    if (state.passwordRepeat === state.password) {
      setError({ ...error, passwordRepeat: '' });
    } else {
      setError({ ...error, passwordRepeat: 'Пароли не совпадают' });
    }
  };

  const handleOnInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <form className={styles.form} method="post">
      <img src="images/btnHideForm.png" />
      <h1>Регистрация</h1>

      <div>
        <input
          onInput={handleOnInput}
          onBlur={handleOnBlur}
          value={state.surname}
          autoComplete="off"
          type="text"
          name="surname"
          placeholder="Введите фамилию"
          spellCheck={false}
        />
        <span>{error.surname}</span>
      </div>
      <div>
        <input
          onInput={handleOnInput}
          onBlur={handleOnBlur}
          value={state.name}
          autoComplete="off"
          type="text"
          name="name"
          placeholder="Введите имя"
          spellCheck={false}
        />
        <span>{error.name}</span>
      </div>
      <div>
        <input
          onInput={handleOnInput}
          onBlur={handleOnBlur}
          value={state.lastname}
          autoComplete="off"
          type="text"
          name="lastname"
          placeholder="Введите отчество"
          spellCheck={false}
        />
        <span>{error.lastname}</span>
      </div>
      <div>
        <input
          onInput={handleOnInput}
          onBlur={handleOnBlur}
          value={state.email}
          autoComplete="off"
          type="email"
          name="email"
          placeholder="Введите e-mail"
          spellCheck={false}
        />
        <span>{error.email}</span>
      </div>
      <div>
        <input
          id="tel"
          onInput={handleOnInput}
          onBlur={handleOnBlur}
          value={state.tel}
          autoComplete="off"
          type="tel"
          name="tel"
          placeholder="+7(999) 999-99-99"
          spellCheck={false}
        />
        <span>{error.tel}</span>
      </div>
      <div>
        <input
          onInput={handleOnInput}
          onBlur={handleOnBlur}
          value={state.password}
          autoComplete="off"
          type="password"
          name="password"
          placeholder="Введите пароль"
          spellCheck={false}
        />
        <span>{error.password}</span>
      </div>

      {state.password.length > 0 && error.password.length === 0 && (
        <div>
          <input
            onInput={handleOnInput}
            onBlur={handleOnBlurPwdRepeat}
            value={state.passwordRepeat}
            autoComplete="off"
            type="password"
            name="passwordRepeat"
            placeholder="Подтвердите пароль"
            spellCheck={false}
          />
          <span>{error.passwordRepeat}</span>
        </div>
      )}
      <button type="submit">Регистрация</button>
    </form>
  );
};

export default Signup;
