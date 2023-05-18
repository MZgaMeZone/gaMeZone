import React from 'react';
import styles from '../../../src/style/admin.module.css';
import Menu from './menu';
import Footer from './footer';
import { ReactComponent as Star } from '../../style/icons/star.svg';
const AdminUser = () => {
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
        <nav>
          <div>
            <button>
              <p>회원 정보 관리</p>
            </button>
            <button>
              <p>회원 탈퇴</p>
            </button>
            <button>
              <p>블랙리스트</p>
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
      <Footer idx={3} />
    </>
  );
};
export default AdminUser;
