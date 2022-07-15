import styles from './Card.module.scss';

const Card = ({ title, price, imagesURL }) => {
  return (
    <div className={styles.card}>
      <img src={imagesURL[0] || './images/noImage.jpg'} alt="product_photo" />
      <div className={styles.info}>
        <h1>{title}</h1>
        <div className={styles.terms}>
          <span className={styles.period}>сутки</span>
          <span className={styles.price}>{price} ₽</span>
        </div>
        <button>Взять в аренду</button>
      </div>
    </div>
  );
};

export { Card };
