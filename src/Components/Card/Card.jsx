import styles from './Card.module.scss';

const Card = ({ name, price, imageUrl }) => {
  return (
    <div className={styles.card}>
      <img src={imageUrl} alt="product_photo" />
      <div className={styles.info}>
        <h1>{name}</h1>
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
