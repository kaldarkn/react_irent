import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

const Header = ({ authorizedUserData, openLogin, openSignUp }) => {
  return (
    <header>
      <Link to="/">
        <img
          onClick={() => alert(authorizedUserData.id)}
          className={styles.irent}
          src="./images/icon.png"
          alt="IRent_icon"
        />
      </Link>
      {!Boolean(authorizedUserData.id) ? (
        <div>
          <button onClick={() => openLogin()}>LOGIN</button>
          <button onClick={() => openSignUp()}>SIGNUP</button>
        </div>
      ) : (
        <div>
          <img className={styles.likes} src="./images/heart.png" alt="IRent_icon" />
          <img className={styles.user} src={authorizedUserData.userIonURL} alt="User_icon" />
        </div>
      )}
    </header>
  );
};

export { Header };
