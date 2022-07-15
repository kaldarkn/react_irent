import styles from './PersonalArea.module.scss';
const PersonalArea = ({ authorizedUserData }) => {
  return (
    <div className={styles.personInfo}>
      <img className={styles.user} src={authorizedUserData.userIconURL} alt="User_icon" />
      <div className={styles.info}>
        <p>Имя: {authorizedUserData.name}</p>
        <p>Фамилия: {authorizedUserData.surname}</p>
        <p>тел: {authorizedUserData.phone}</p>
        <p>email: {authorizedUserData.email}</p>
      </div>
    </div>
  );
};

export { PersonalArea };
