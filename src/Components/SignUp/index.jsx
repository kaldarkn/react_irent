import { useEffect, useState } from 'react';
import IMask from 'imask';
import styles from './Signup.module.scss';

//В дальнейшем можно input сделать как отдельный компонент и передавать туда обработчики и прочее через props-ы

const Signup = () => {
  let [isValid, setIsValid] = useState(false);
  let [name, setName] = useState('');
  let [nameError, setNameError] = useState('');
  let [surname, setSurname] = useState('');
  let [surnameError, setSurnameError] = useState('');
  let [lastname, setLastname] = useState('');
  let [lastnameError, setLastnameError] = useState('');
  let [email, setEmail] = useState('');
  let [emailError, setEmailError] = useState('');
  let [tel, setTel] = useState('');
  let [telError, setTelError] = useState('');
  let [password, setPassword] = useState('');
  let [passwordError, setPasswordError] = useState('');
  let [passwordRepeat, setPasswordRepeat] = useState('');
  let [passwordRepeatError, setPasswordRepeatError] = useState('');

  //Задание маски для инпута ввода номера телефона (Временный костыль (или не костыль?))
  useEffect(() => {
    IMask(document.getElementById('tel'), {
      mask: '+{7} (000) 000-00-00',
    });
  }, []);

  //Функция, которая проверяет валидацию ФИО. Данная функция вызывается в обработчике onInput
  const checkName = (
    e,
    callbackSetError,
    callbackSetInput,
    strInputError,
    strLengthError = 'Не более 15 символов',
  ) => {
    //Разрешен ввод только кириллицы
    if (/^[А-ЯЁа-яё]*$|^[А-ЯЁа-яё][А-ЯЁа-яё ]*[А-ЯЁа-яё]$/.test(e.target.value)) {
      //Проверка на длину поля (не более 15 символов)
      if (e.target.value.length > 15) {
        callbackSetError(strLengthError);
      } else {
        callbackSetInput(e.target.value);
        callbackSetError('');
      }
    } else {
      callbackSetError(strInputError);
    }
  };

  //Обработчик, который запускается, если потерян фокус
  const handleOnBlur = (e) => {
    //Если после отведения фокуса, поле осталось пустым, выводим информацию для юзера
    if (e.target.value.length === 0) {
      switch (e.target.name) {
        case 'surname':
          setSurnameError('Поле ввода фамилии не может быть пустым');
          break;
        case 'name':
          setNameError('Поле ввода имени не может быть пустым');
          break;
        case 'lastname':
          setLastnameError('Поле ввода отчества не может быть пустым');
          break;
        case 'email':
          setEmailError('Поле ввода email не может быть пустым');
          break;
        case 'tel':
          setTelError('Поле ввода номера телефона не может быть пустым');
          break;
        case 'password':
          setPasswordError('Поле ввода пароля не может быть пустым');
          break;
        case 'passwordRepeat':
          setPasswordRepeatError('Поле подтверждения пароля не может быть пустым');
          break;
        default:
          break;
      }
    } else {
      switch (e.target.name) {
        case 'surname':
          setSurnameError('');
          break;
        case 'name':
          setNameError('');
          break;
        case 'lastname':
          setLastnameError('');
          break;
        case 'email':
          //Валидация поля email по регулярному выражению
          if (/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(e.target.value)) {
            setEmailError('');
          } else {
            setEmailError('Некорректно введён email');
          }
          break;
        case 'tel':
          if (/^[+][0-9] [(][0-9]{3}[)] [0-9]{3}[-][0-9]{2}[-][0-9]{2}$/.test(e.target.value)) {
            setTelError('');
          } else {
            setTelError('Некорректно введён номер телефона');
          }
          break;
        case 'password':
          //Регулярка: Хоть одна цифра
          //Хоть одна латиница в верхнем регистре
          //Хоть одна латиница в нижнем регистре
          //Во всей строке не допускаются пробелы
          //Не менее 8 символов
          //
          if (/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{8,}$/.test(e.target.value)) {
            setPasswordError('');
          } else {
            setPasswordError(
              'Длина пароля не менее 8 символов. Обязательно должен включать латиницу в верхнем и нижнем регистре и цифры. Без пробелов',
            );
          }
          break;
        case 'passwordRepeat':
          if (passwordRepeat === password) {
            setPasswordRepeatError('');
          } else {
            setPasswordRepeatError('Пароли не совпадают');
          }
          break;
        default:
          break;
      }
    }
  };

  //Обработчик, который запускается при событии onInput
  const handleOnInput = (e) => {
    switch (e.target.name) {
      case 'surname':
        checkName(e, setSurnameError, setSurname, 'Для ввода фамилии используйте только кириллицу');
        break;
      case 'name':
        checkName(e, setNameError, setName, 'Для ввода имени используйте только кириллицу');
        break;
      case 'lastname':
        checkName(
          e,
          setLastnameError,
          setLastname,
          'Для ввода отчества используйте только кириллицу',
        );
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'tel':
        setTel(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      case 'passwordRepeat':
        setPasswordRepeat(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <form className={styles.form} method="post">
      <img src="image/btnHideForm.png" />
      <h1>Регистрация</h1>

      <div>
        <input
          onInput={handleOnInput}
          onBlur={handleOnBlur}
          value={surname}
          autoComplete="off"
          type="text"
          name="surname"
          placeholder="Введите фамилию"
          spellCheck={false}
        />
        <span>{surnameError}</span>
      </div>
      <div>
        <input
          onInput={handleOnInput}
          onBlur={handleOnBlur}
          value={name}
          autoComplete="off"
          type="text"
          name="name"
          placeholder="Введите имя"
          spellCheck={false}
        />
        <span>{nameError}</span>
      </div>
      <div>
        <input
          onInput={handleOnInput}
          onBlur={handleOnBlur}
          value={lastname}
          autoComplete="off"
          type="text"
          name="lastname"
          placeholder="Введите отчество"
          spellCheck={false}
        />
        <span>{lastnameError}</span>
      </div>
      <div>
        <input
          onInput={handleOnInput}
          onBlur={handleOnBlur}
          value={email}
          autoComplete="off"
          type="email"
          name="email"
          placeholder="Введите e-mail"
          spellCheck={false}
        />
        <span>{emailError}</span>
      </div>
      <div>
        <input
          id="tel"
          onInput={handleOnInput}
          onBlur={handleOnBlur}
          value={tel}
          autoComplete="off"
          type="tel"
          name="tel"
          placeholder="+7(999) 999-99-99"
          spellCheck={false}
        />
        <span>{telError}</span>
      </div>
      <div>
        <input
          onInput={handleOnInput}
          onBlur={handleOnBlur}
          value={password}
          autoComplete="off"
          type="password"
          name="password"
          placeholder="Введите пароль"
          spellCheck={false}
        />
        <span>{passwordError}</span>
      </div>

      {password.length > 0 && passwordError.length === 0 && (
        <div>
          <input
            onInput={handleOnInput}
            onBlur={handleOnBlur}
            value={passwordRepeat}
            autoComplete="off"
            type="password"
            name="passwordRepeat"
            placeholder="Подтвердите пароль"
            spellCheck={false}
          />
          <span>{passwordRepeatError}</span>
        </div>
      )}
      <button type="submit">Регистрация</button>
    </form>
  );
};

export default Signup;
