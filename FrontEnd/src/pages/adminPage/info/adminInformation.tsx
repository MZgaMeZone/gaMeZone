import React, { useState } from 'react';
import styles from '../../../style/admin.module.css';
import Menu from '../menu';
import Footer from '../footer';
import { ReactComponent as Question } from '../../../style/icons/question.svg';
import styled from 'styled-components';
import GameInfoEdit from './gameInfoEdit';
import GameCategory from './gameCategory';
const AdminInfomation = () => {
  const [menuIdx, setMenuIdx] = useState<number>(0);

  const handleClick = (idx: number) => {
    setMenuIdx(idx);
  };
  return (
    <div>
      <Menu idx={1} />
      <div className={styles.container}>
        <header>
          <div>
            <p>게임 정보 관리</p>
            <Question style={{ width: '12rem', height: '5.5rem' }} />
          </div>
        </header>
        <div className={styles.sub_menu}>
          <div
            className={`${styles.menu_item} ${
              menuIdx === 0 ? styles.selected_menu : styles.menu_hover
            }`}
            onClick={() => handleClick(0)}
          >
            <p>게임 정보 관리</p>
            {menuIdx === 0 ? <span className={styles.span} /> : ''}
          </div>
          <div
            className={`${styles.menu_item} ${
              menuIdx === 1 ? styles.selected_menu : styles.menu_hover
            }`}
            onClick={() => handleClick(1)}
          >
            <p>카테고리 관리</p>
            {menuIdx === 1 ? <span className={styles.span} /> : ''}
          </div>
        </div>
        <div className={styles.scroll}>
          <div className={styles.content}>
            <div className={styles.sub_title}>
              {menuIdx === 0 ? (
                <p>게임 정보 관리</p>
              ) : menuIdx === 1 ? (
                <p>카테고리 관리</p>
              ) : (
                ''
              )}
            </div>
            {menuIdx === 0 ? (
              <GameInfoEdit />
            ) : menuIdx === 1 ? (
              <GameCategory />
            ) : (
              ''
            )}
            <div className={styles.footer_div}></div>
          </div>
        </div>
        <footer>
          <div className={styles.footer_box}>
            <div className={styles.footer_content}></div>
          </div>
        </footer>
      </div>
      <Footer idx={1} />
    </div>
  );
};
export default AdminInfomation;
