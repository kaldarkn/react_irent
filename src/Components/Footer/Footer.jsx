import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer>
      <Link to="/">
        <img className={styles.irent} src="./images/icon.png" alt="IRent_icon" />
      </Link>
      <h1>ООО "IRENTeam"</h1>
      <div className={styles.social}>
        <h1>Свяжитесь с нами</h1>
        <div>
          <a href="/#">
            <img src="./images/whatsapp.png" alt="whatsapp" />
          </a>
          <a href="/#">
            <img src="./images/facebook.png" alt="facebook" />
          </a>
          <a href="/#">
            <img src="./images/instagram.png" alt="instagram" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
