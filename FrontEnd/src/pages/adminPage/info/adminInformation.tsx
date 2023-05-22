import React, { useState } from 'react';
import styles from '../../../style/admin.module.css';
import Menu from '../menu';
import Footer from '../footer';
import { ReactComponent as Question } from '../../../style/icons/question.svg';
import styled from 'styled-components';
import AdminInfoEdit from './adminInfoEdit';
import AdminInfoCategory from './adminInfoCategory';
const AdminInfomation = () => {
  const [menuIdx, setMenuIdx] = useState<number>(0);

  const handleClick = (idx: number) => {
    setMenuIdx(idx);
  };
  return (
    <>
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
        <Scroll>
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
              <AdminInfoEdit />
            ) : menuIdx === 1 ? (
              <AdminInfoCategory />
            ) : (
              ''
            )}
            <FooterLine></FooterLine>
          </div>
        </Scroll>
        <footer>
          <div className={styles.footer_box}>
            <div className={styles.footer_content}></div>
          </div>
        </footer>
      </div>
      <Footer idx={1} />
    </>
  );
};
export default AdminInfomation;

const Scroll = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 16px;
  }
  &::-webkit-scrollbar-thumb {
    height: 10%;
    background-clip: padding-box;
    border: 4px solid #ebeded;
    background: #b3b5b5;
    border-radius: 50px;
  }
  &::-webkit-scrollbar-track {
    background: #ebeded;
  }
`;
const FooterLine = styled.div`
  padding: 2rem;
`;
