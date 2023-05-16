import React,{useState,useEffect} from "react";
import styles from "../../../src/style/adminMenu.module.css";
const Menu = () =>{
  const [menu,setMenu] = useState(0);
  useEffect(()=>{

  },[])
  return(
  <div className={styles.wrapper}>
    <div className={styles.menu}>
        <div><p>대시보드</p></div>
        <div><p>게임 정보</p></div>
        <div><p>게임 기록</p></div>
        <div><p>회원 정보</p></div>
        <div><p>홈페이지 바로가기</p></div>
    </div>
  </div>
  )
}
export default Menu