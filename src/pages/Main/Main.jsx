import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Signup, Login, Search, FilterSelect } from '../../components';

import styles from './Main.module.scss';

// const items = [
//   {
//   name: 'Playstation 2',
//   price: '500',
//   imageUrl: 'http://www.savelagame.ru/image/data/Euro_IT/02(18)_10_statya.jpg',
// },
// {
//   name: 'Playstation 2',
//   price: '300',
//   imageUrl: 'https://static.eldorado.ru/photos/71/710/019/24/new_71001924_l_1.jpg',
// },
// {
//   name: 'Playstation 2',
//   price: '650',
//   imageUrl: 'https://sidex.ru/images_offers/587/587042/sony_playstation_2_slim_pink_1.jpg',
// },
// {
//   name: 'Iphone 11',
//   price: '500',
//   imageUrl:
//     'https://assets.swappie.com/cdn-cgi/image/width=600,height=600,fit=contain,format=auto/swappie-iphone-11-red-back.png',
// },
// {
//   name: 'Iphone 5',
//   price: '200',
//   imageUrl:
//     'https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP685/SP685-color_silver.jpg',
// },
// {
//   name: 'Джойстик',
//   price: '650',
//   imageUrl: 'https://avatars.mds.yandex.net/get-mpic/4944925/img_id8206715014404566464.jpeg/orig',
// },
// {
//   name: 'IQOS 3 duos',
//   price: '999',
//   imageUrl:
//     'https://d2d22nphq0yz8t.cloudfront.net/8dc60dcf-a0ba-480a-bfc8-3a5d9683eb12/https://iqos.ru/upload/landing/5a5/Image_31562_1x.png/mxw_1242,f_auto',
// },
// {
//   name: 'IQOS 2',
//   price: '300',
//   imageUrl: 'https://static.insales-cdn.com/images/products/1/1048/247292952/large_2.4white.jpg',
// },
// {
//   name: 'Чайник',
//   price: '750',
//   imageUrl:
//     'https://img.kcentr.ru/uploads/product/2020/180434/photo/d7789ef7058d3f1bb3a46f5a98d68704e8e92fba_1000x1000.jpg',
// },
// {
//   name: 'PowerBank',
//   price: '555',
//   imageUrl:
//     'https://www.tradeinn.com/f/13771/137713963/ksix-20000mah-%D0%A1-%D0%BA%D0%B0%D0%B1%D0%B5%D0%BB%D0%B5%D0%BC-micro-usb-powerbank.jpg',
// },
// {
//   name: 'Наушники',
//   price: '100',
//   imageUrl: 'https://cdn1.ozone.ru/s3/multimedia-3/c1200/6064315623.jpg',
// },
// {
//   name: 'Наушники',
//   price: '150',
//   imageUrl: 'https://cdn.svyaznoy.ru/upload/iblock/18e/4-500x500.jpg/resize/483x483/hq/',
// },
// ];

const Main = ({
  signUpOpened,
  loginOpened,
  openLogin,
  setAuthorizedUserData,
  authorizedUserData,
  openSignUp,
}) => {
  let [items, setItems] = useState([]);
  let [filtredItems, setFiltredItems] = useState([]);

  useEffect(() => {
    //Пока тестирую (запрос рабочий, но нужно обрабатывать ошибки)
    axios.get(`http://irental.ddns.net/feed?from=1&to=1000`).then((response) => {
      //Это костыль (временный, перед презентацией проекта выявились косяки бэка. ПОТОМ УБЕРИ УСЛОВИЕ и РАСКОМЕНТЬ sets)
      let resp = response.data.map((val, i) => {
        if (!val.title) {
          val.title = 'Без названия';
        }
        return val;
      });
      setItems(resp);
      setFiltredItems(resp);
      // setItems(response.data);
      // setFiltredItems(response.data);
    });
  }, []);

  let handleChangeSearch = (e) => {
    let searchItems = items.filter((item) =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setFiltredItems(searchItems);
  };

  let handleOnChangeSetCategory = (e) => {
    //Пока тестирую (запрос рабочий, но нужно обрабатывать ошибки)
    axios.get(`http://irental.ddns.net/cards/${e.target.value}`).then((response) => {
      //Это костыль (временный, перед презентацией проекта выявились косяки бэка. ПОТОМ УБЕРИ УСЛОВИЕ и РАСКОМЕНТЬ sets)
      let resp = response.data.map((val, i) => {
        if (!val.title) {
          val.title = 'Без названия';
        }
        return val;
      });
      setItems(resp);
      setFiltredItems(resp);
      // setItems(response.data);
      // setFiltredItems(response.data);
    });
  };

  return (
    <>
      {signUpOpened && <Signup openSignUp={openSignUp} />}
      {loginOpened && !authorizedUserData.id && (
        <Login openLogin={openLogin} setAuthorizedUserData={setAuthorizedUserData} />
      )}

      <div className={styles.filter}>
        <Search handleChangeSearch={handleChangeSearch} />
        <FilterSelect handleOnChangeSetCategory={handleOnChangeSetCategory} />
      </div>

      <section className={styles.list}>
        {filtredItems.map((item, index) => (
          <Card key={item.id} {...item} />
        ))}
      </section>
    </>
  );
};

export { Main };
