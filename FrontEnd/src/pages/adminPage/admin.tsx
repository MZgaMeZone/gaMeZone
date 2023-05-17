import React from 'react';
import styles from '../../../src/style/admin.module.css';
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
            <Mushiroom style={{ width: '11.5rem', height: '5.6rem' }} />
          </div>
          <p>대시보드</p>
        </header>
        <nav>
          <button>
            <p>방문자 현황</p>
          </button>
          <button>
            <p>일자별 요약</p>
          </button>
          <button>
            <p>통계</p>
          </button>
        </nav>
        <main>
          <div className={styles.content}></div>
        </main>
        <footer>
          <div></div>
        </footer>
      </div>
      <Footer />
    </>
  );
};
export default Admin;
