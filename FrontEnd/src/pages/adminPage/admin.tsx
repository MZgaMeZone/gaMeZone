import React from 'react';
import styles from '../../style/admin.module.css';
import styled from 'styled-components';
import Menu from './menu';
import Footer from './footer';
import { ReactComponent as Mushiroom } from '../../style/icons/mushroom.svg';
const Admin = () => {
  return (
    <>
      <Menu idx={0} />
      <div className={styles.container}>
        <header>
          <div>
            <p className={styles.title}>대시보드</p>
            <Mushiroom style={{ width: '11.5rem', height: '5.6rem' }} />
          </div>
        </header>
        <nav>
          <div>
            <button>
              <p>방문자 현황</p>
            </button>
            <button>
              <p>일자별 요약</p>
            </button>
            <button>
              <p>통계</p>
            </button>
          </div>
        </nav>
        <ScrollCotent>
          <main>
            <div className={styles.content}></div>
          </main>
        </ScrollCotent>
        <footer>
          <div className={styles.footer_box}>
            <div className={styles.footer_content}></div>
          </div>
        </footer>
      </div>
      <Footer idx={0} />
    </>
  );
};
export default Admin;

const ScrollCotent = styled.div`
  overflow-y: auto;

  height: calc(100vh- 5rem);
`;
