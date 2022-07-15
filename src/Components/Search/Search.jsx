import styles from './Search.module.scss';

const Search = ({ handleChangeSearch }) => {
  return (
    <div className={styles.search} type="text" placeholder="Поиск...">
      <input onChange={(e) => handleChangeSearch(e)} type="text" placeholder="Поиск..."></input>
    </div>
  );
};

export { Search };
