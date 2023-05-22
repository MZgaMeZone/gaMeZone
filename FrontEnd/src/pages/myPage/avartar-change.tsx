import Container from './components/container';
import styled from 'styled-components';
import { useState, useRef } from 'react';
import { MouseEvent, FormEvent } from 'react';

function AvartarChange() {
  //FileList 유형은 input tupe="file"에서 선택한 파일 목록을 나타냄
  // const [files, setFiles] = useState<FileList | null>(null);
  // const imgRef = useRef<HTMLInputElement>(null);

  // const onLoadFile = () => {
  //   const file = imgRef.current.files[0];
  //   console.log(file);
  //   setFiles(file);
  // };

  // const handleClick = (e: FormEvent<HTMLInputElement>) => {
  //   const formData = new FormData();
  //   formData.append("file", files![0]);

  //   const config = {
  //     Header: {
  //       "content-type": "multipart/form-data",
  //     },
  //   };
  //   //axios.post('api',formData,config);
  // };

  return (
    <div>
      <Container>
        <h1>프로필 사진 변경</h1>
        {/* <div className="preview_img">
          <img src={files} alt="미리보기" />
        </div>
        <form action="">
          <label className="profileImg-label" htmlFor="profileImg">
            프로필 이미지 추가
          </label>
          <input
            type="file"
            accept="image/*"
            id="profileImg"
            onChange={onLoadFile}
            ref={imgRef}
          />
          <button onClick={handleClick}>프로필 사진 변경</button>
        </form> */}
      </Container>
    </div>
  );
}

export default AvartarChange;
