import { useEffect, useState } from 'react';
import IMask from 'imask';
import styles from './Signup.module.scss';
import axios from 'axios';

const REG_VALID = {
  email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
  password: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$)[A-Za-z0-9!@%&]{8,}$/,
  name: /^[А-ЯЁа-яё]*$|^[А-ЯЁа-яё][А-ЯЁа-яё ]*[А-ЯЁа-яё]$/,
  surname: /^[А-ЯЁа-яё]*$|^[А-ЯЁа-яё][А-ЯЁа-яё ]*[А-ЯЁа-яё]$/,
  phone: /^[+][0-9] [(][0-9]{3}[)] [0-9]{3}[-][0-9]{2}[-][0-9]{2}$/,
};

const Signup = ({ openSignUp }) => {
  let [state, setState] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    password: '',
    passwordRepeat: '',
  });

  let [file, setFile] = useState(null);

  let [error, setError] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    password: '',
    passwordRepeat: '',
  });

  let [verification, setVerification] = useState(false);
  let [tempUserId, setTempUserId] = useState('');
  let [emailCode, setEmailCode] = useState('');

  useEffect(() => {
    IMask(document.getElementById('phone'), {
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

  //Пока тестирую (запрос рабочий, но нужно обрабатывать ошибки)
  const submitForm = (e) => {
    e.preventDefault();
    if (!tempUserId) {
      axios
        .put('http://irental.ddns.net/login', {
          email: state.email,
          password: state.password,
          name: state.name,
          surname: state.surname,
          phone: '+79234165687',
        })
        .then((response) => {
          setTempUserId(response.data);
          //После успешной отправке данных формы, далее отправляем аватарку
          let formData = new FormData();
          formData.append('personalIcon', file);
          formData.append('id', response.data);
          axios
            .put('http://irental.ddns.net/login/icon', formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then((response) => {
              setState({});
              setError({});
            })
            .catch((error) => alert('Ошибка при отправке картинки:', error));
        })
        .catch((error) => alert('Ошибка при отправке данных для регистрации:', error));
    } else {
      axios
        .patch('http://irental.ddns.net/login', {
          tempID: tempUserId,
          emailCode: emailCode,
        })
        .then(() => {
          setVerification(true);
          openSignUp();
        })
        .catch((error) => alert('Ошибка при отправке кода доступа:', error));
    }
  };

  const handleChangeInputFile = (e) => {
    //Если файл выбран
    if (e.target.files[0]) {
      document.getElementById('photo').src = URL.createObjectURL(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} method="post">
        <img
          className={styles.hide}
          onClick={() => openSignUp()}
          src="images/btnHideForm.png"
          alt="hideForm"
        />
        <h1>Регистрация</h1>
        {tempUserId === '' ? (
          <>
            <label htmlFor="file">
              <img id="photo" src="images/addPhoto.png" alt="usetPhoto" />
              <input
                onChange={(e) => handleChangeInputFile(e)}
                type="file"
                id="file"
                name="photo"
                accept=".jpg, .jpeg"
              />
            </label>

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
            <span className={styles.errorMessage}>{error.surname}</span>

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
            <span className={styles.errorMessage}>{error.name}</span>

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
            <span className={styles.errorMessage}>{error.email}</span>

            <input
              id="phone"
              onInput={handleOnInput}
              onBlur={handleOnBlur}
              value={state.phone}
              autoComplete="off"
              type="tel"
              name="phone"
              placeholder="+7(999) 999-99-99"
              spellCheck={false}
            />
            <span className={styles.errorMessage}>{error.phone}</span>

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
            <span className={styles.errorMessage}>{error.password}</span>

            {state.password.length > 0 && error.password.length === 0 && (
              <>
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
                <span className={styles.errorMessage}>{error.passwordRepeat}</span>
              </>
            )}
          </>
        ) : (
          <div>
            <input
              onInput={(e) => setEmailCode(e.target.value)}
              value={emailCode}
              autoComplete="off"
              type="text"
              name="emailCode"
              placeholder="Введите код"
              spellCheck={false}
            />
          </div>
        )}

        <button onClick={submitForm}>{tempUserId ? 'Отправить' : 'Регистрация'}</button>
      </form>
    </div>
  );
};

export { Signup };
