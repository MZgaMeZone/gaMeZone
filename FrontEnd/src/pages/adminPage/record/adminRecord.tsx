import React, { useState } from 'react';
import styles from '../../../../src/style/admin.module.css';
import Menu from '../menu';
import Footer from '../footer';
import { ReactComponent as Mario } from '../../../style/icons/mario.svg';
import SubMenu from './subMenu';
import styled from 'styled-components';

const AdminRecord = () => {
  const [menuIdx, setMenuIdx] = useState<number>(0);

  const handleClick = (idx: number) => {
    setMenuIdx(idx);
  };
  return (
    <>
      <Menu idx={2} />
      <div className={styles.container}>
        <header>
          <div>
            <p>게임 기록 관리</p>
            <Mario style={{ width: '9rem', height: '5.4rem' }} />
          </div>
        </header>
        <div className={styles.sub_menu}>
          <div
            className={`${styles.menu_item} ${
              menuIdx === 0 ? styles.selected_menu : styles.menu_hover
            }`}
            onClick={() => handleClick(0)}
          >
            <p>게임 기록 관리</p>
            {menuIdx === 0 ? <span className={styles.span} /> : ''}
          </div>
        </div>
        <Scroll>
          <div className={styles.content}>
            <div className={styles.sub_title}>
              {menuIdx === 0 ? <p>게임 기록 관리</p> : ''}
            </div>
            <div className={styles.main_text}>
              {menuIdx === 0 ? <SubMenu /> : ''}
            </div>
            <FooterLine></FooterLine>
          </div>
        </Scroll>
        <footer>
          <div className={styles.footer_box}>
            <div className={styles.footer_content}></div>
          </div>
        </footer>
      </div>
      <Footer idx={2} />
    </>
  );
};
export default AdminRecord;

const Scroll = styled.div`
  overflow-y: auto;
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
