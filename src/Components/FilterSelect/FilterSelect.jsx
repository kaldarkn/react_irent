import styles from './FilterSelect.module.scss';

//это временно
const categories = [
  'Все товары',
  'Бытовая техника',
  'Отдых',
  'Всё для дома',
  'Одежда',
  'Спорт',
  'Хобби и отдых',
  '18+',
  'Личные вещи',
  'Для дома и дачи',
];

const categoriesAPI = [
  'all',
  'appliances',
  'recreation',
  'home',
  'clothes ',
  'sport',
  'hobby',
  'xxx',
  'things',
  'dacha',
];

const FilterSelect = ({ handleOnChangeSetCategory }) => {
  return (
    <div className={styles.select}>
      <select className={styles.filterCategory} onChange={(e) => handleOnChangeSetCategory(e)}>
        {categories.map((category, index) => (
          <option value={categoriesAPI[index]} key={index}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export { FilterSelect };
