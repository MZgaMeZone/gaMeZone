import React from 'react';
import styles from '../../../src/style/admin.module.css';
import Menu from './menu';
import Footer from './footer';
import { ReactComponent as Mario } from '../../style/icons/mario.svg';
const AdminRecord = () => {
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
        <nav>
          <div>
            <button>
              <p>게임 기록</p>
            </button>
            <button>
              <p>기록 삭제</p>
            </button>
          </div>
        </nav>
        <main>
          <div className={styles.content}></div>
        </main>
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
