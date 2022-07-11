import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer>
      <img className={styles.irent} src="./image/Icon.png" alt="IRent_icon" />
      <h1>ООО "IRENTeam"</h1>

      <div className={styles.social}>
        <h1>Свяжитесь с нами</h1>
        <div>
          <a href="/#">
            <img src="./image/Whatsapp.png" alt="whatsapp" />
          </a>
          <a href="/#">
            <img src="./image/Facebook.png" alt="facebook" />
          </a>
          <a href="/#">
            <img src="./image/Instagram.png" alt="instagram" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
