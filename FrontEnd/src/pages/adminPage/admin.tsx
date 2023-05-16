import React from "react";
import styles from "./admin.module.css";
const Admin = () =>{
  return(
   <>
    <div className={styles.container}>
      <div className={styles.header}><p>ADMIN - 메인 대시보드</p></div>
      <div className={styles.sub_menu}>
        <button>방문자 현황</button>
        <button>일자별 요약</button>
      </div>
    </div>
   </>
  )
}
export default Admin