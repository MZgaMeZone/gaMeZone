import React, { useState, useEffect } from 'react';
import styles from '../../../src/style/adminMenu.module.css';
import { useNavigate } from 'react-router-dom';

type MenuIdx = {
  idx: number;
};

const Menu = ({ idx }: MenuIdx) => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState<number>(idx);
  const handleClick = (idx: number) => {
    setMenu(idx);
  };
  useEffect(() => {
    if (menu === 0) {
      navigate('/admin');
    } else if (menu === 1) {
      navigate('/admin/information');
    } else if (menu === 2) {
      navigate('/admin/record');
    } else if (menu === 3) {
      navigate('/admin/user');
    } else if (menu === 4) {
      navigate('/');
    }
  }, [menu]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.menu}>
        <div className={styles.menu_dashboard} onClick={() => handleClick(0)}>
          {menu === 0 ? (
            <div className={styles.selected_menu}></div>
          ) : (
            <div className={styles.menu_hover}></div>
          )}
          <p>대시보드</p>
        </div>
        <div className={styles.menu_info} onClick={() => handleClick(1)}>
          {menu === 1 ? (
            <div className={styles.selected_menu}></div>
          ) : (
            <div className={styles.menu_hover}></div>
          )}
          <p>게임 정보</p>
        </div>
        <div className={styles.menu_record} onClick={() => handleClick(2)}>
          {menu === 2 ? (
            <div className={styles.selected_menu}></div>
          ) : (
            <div className={styles.menu_hover}></div>
          )}
          <p>게임 기록</p>
        </div>
        <div className={styles.menu_user} onClick={() => handleClick(3)}>
          {menu === 3 ? (
            <div className={styles.selected_menu}></div>
          ) : (
            <div className={styles.menu_hover}></div>
          )}
          <p>회원 정보</p>
        </div>
        <div className={styles.menu_home} onClick={() => handleClick(4)}>
          {menu === 4 ? (
            <div className={styles.selected_menu}></div>
          ) : (
            <div className={styles.menu_hover}></div>
          )}
          <p>홈페이지 바로가기</p>
        </div>
      </div>
    </div>
  );
};
export default Menu;
