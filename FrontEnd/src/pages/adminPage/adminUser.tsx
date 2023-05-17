import React from "react";
import styles from "../../../src/style/admin.module.css";
import Menu from "./menu";
const AdminUser = () =>{
  return(
  <>
  <Menu idx={3}/>
    <div className={styles.container}>
      <header><p>회원 관리</p></header>
      <nav>
        <button><p>회원 정보 관리</p></button>
        <button><p >회원 탈퇴</p></button>
        <button><p >블랙리스트</p></button>        
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
export default AdminUser