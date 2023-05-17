import React from "react";
import styles from "../../../src/style/admin.module.css";
import Menu from "./menu";
const AdminRecord = () =>{
  return(
  <>
    <Menu idx={2}/>
    <div className={styles.container}>
      <header><p>게임 기록 관리</p></header>
      <nav>
        <button><p>게임 기록</p></button>
        <button><p >기록 삭제</p></button>
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
export default AdminRecord