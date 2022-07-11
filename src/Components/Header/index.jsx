import styles from './Header.module.scss';

const Header = () => {
  return (
    <header>
      <img className={styles.irent} src="./image/Icon.png" alt="IRent_icon" />
      <img className={styles.user} src="./image/User.png" alt="User_icon" />
    </header>
  );
};

export default Header;
