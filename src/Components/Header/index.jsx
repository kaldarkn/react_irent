import styles from './Header.module.scss';

const Header = () => {
  return (
    <header>
      <img className={styles.irent} src="./images/icon.png" alt="IRent_icon" />
      <img className={styles.user} src="./images/user.png" alt="User_icon" />
    </header>
  );
};

export default Header;
