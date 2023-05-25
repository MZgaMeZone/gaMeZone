import React, { useState } from 'react';
import styles from '../../../../src/style/admin.module.css';
import Menu from '../menu';
import Footer from '../footer';
import { ReactComponent as Star } from '../../../style/icons/star.svg';
import UserList from './userList';
import SearchUser from './searchUser';
const AdminUser = () => {
  const [menuIdx, setMenuIdx] = useState<number>(0);

  const handleClick = (idx: number) => {
    setMenuIdx(idx);
  };
  return (
    <>
      <Menu idx={3} />
      <div className={styles.container}>
        <header>
          <div>
            <p>회원 정보 관리</p>
            <Star style={{ width: '6rem', height: '5.2rem' }} />
          </div>
        </header>
        <div className={styles.sub_menu}>
          <div
            className={`${styles.menu_item} ${
              menuIdx === 0 ? styles.selected_menu : styles.menu_hover
            }`}
            onClick={() => handleClick(0)}
          >
            <p>회원 정보 관리</p>
            {menuIdx === 0 ? <span className={styles.span} /> : ''}
          </div>
        </div>
        <div className={styles.scroll}>
          <div className={styles.content}>
            <div className={styles.sub_title}>
              {menuIdx === 0 ? <p>회원 정보 관리</p> : ''}
            </div>
            <div className={styles.main_text}>
              {menuIdx === 0 ? (
                <>
                  <SearchUser />
                  <UserList />
                </>
              ) : (
                ''
              )}
            </div>
            <div className={styles.footer_div}></div>
          </div>
        </div>
        <footer>
          <div className={styles.footer_box}>
            <div className={styles.footer_content}></div>
          </div>
        </footer>
      </div>
      <Footer idx={3} />
    </>
  );
};
export default AdminUser;
