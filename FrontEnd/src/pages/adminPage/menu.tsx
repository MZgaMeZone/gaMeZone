import React,{useState,useEffect} from "react";
import styles from "../../../src/style/adminMenu.module.css";
import { useNavigate } from "react-router-dom";

type MenuIdx = {
  idx: number;
};

const Menu = ({idx}:MenuIdx) =>{
  const navigate = useNavigate()
  const [menu,setMenu] = useState<number>(idx);
  const handleClick=(idx:number) =>{
    setMenu(idx)
  }
  console.log(menu)
  useEffect(()=>{
    if(menu === 0) {
      navigate('/admin')
    } else if(menu === 1){
      navigate('/admin/information')
    } else if(menu === 2){
      navigate('/admin/record')
    } else if(menu === 3){
      navigate('/admin/user')
    } else if(menu === 4){
      navigate('/')
    }

  },[menu])
  return(
  <div className={styles.wrapper}>
    <div className={styles.menu}>
        <div onClick={()=>handleClick(0)}><p>대시보드</p></div>
        <div onClick={()=>handleClick(1)}><p>게임 정보</p></div>
        <div onClick={()=>handleClick(2)}><p>게임 기록</p></div>
        <div onClick={()=>handleClick(3)}><p>회원 정보</p></div>
        <div onClick={()=>handleClick(4)}><p>홈페이지 바로가기</p></div>
    </div>
  </div>
  )
}
export default Menu