import React from 'react';
import styles from '../../style/admin.module.css';
import Menu from './menu';
import Footer from './footer';
import { ReactComponent as Question } from '../../style/icons/question.svg';
const AdminInfomation = () => {
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
        <nav>
          <div>
            <button>
              <p>게임 정보 관리</p>
            </button>
            <button>
              <p>게임 목록</p>
            </button>
            <button>
              <p>카테고리 관리</p>
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
      <Footer idx={1} />
    </>
  );
};
export default AdminInfomation;
