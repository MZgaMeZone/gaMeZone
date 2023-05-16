import React from "react";
import styles from "../../../src/style/admin.module.css";
import Menu from "./menu";
const Admin = () =>{
  return(
  <>
  <Menu idx={0} />
    <div className={styles.container}>
      <header><p>대시보드</p></header>
      <nav>
        <button><p>방문자 현황</p></button>
        <button><p >일자별 요약</p></button>
        <button><p >통계</p></button>        
      </nav>
      <main>
        <div className={styles.content}></div>
      </main>
      <footer>
        <div>
        </div>
      </footer>
    </div>
  </>
  )
}
export default Admin