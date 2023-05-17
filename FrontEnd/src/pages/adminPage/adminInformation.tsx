import React from 'react';
import styles from '../../../src/style/admin.module.css';
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
            <Question style={{ width: '12rem', height: '5.5rem' }} />
          </div>
          <p>게임 정보 관리</p>
        </header>
        <nav>
          <button>
            <p>게임 정보 관리</p>
          </button>
          <button>
            <p>게임 목록</p>
          </button>
        </nav>
        <main>
          <div className={styles.content}></div>
        </main>
        <footer>
          <div></div>
        </footer>
      </div>
      <Footer idx={1} />
    </>
  );
};
export default AdminInfomation;
