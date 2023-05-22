import Container from './components/container';
import styled from 'styled-components';
import React, { useState } from 'react';

function AvartarChange() {
  const [imageSrc, setImageSrc] = useState('');

  const encodeFileToBase64 = (fileBlob: File) => {
    const reader = new FileReader(); //File, Blob 객체를 핸들링
    reader.readAsDataURL(fileBlob); //File, Blob 객체를 읽고 base64로 인코딩한 문자열을 FileReader.result속성에 담아줌
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        //파일이 성공적으로 읽혀지면 트리거됨
        setImageSrc(reader.result as string); //인코딩 된 문자열을 setImage에 넣어서 미리보기
        resolve();
      };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //input 이미지가 변경되면 이 함수에서 파일 체크
    console.log(e.target.files);
    const file = e.target.files?.[0]; //파일이 있다면 file 변수에 할당, null이거나 정의되지 않았다면 file이 정의되지 않은 것으로 간주 없다면  undefined
    if (file) {
      encodeFileToBase64(file);
    }
  };

  return (
    <div>
      <Container>
        <Title>프로필 사진 변경</Title>
        <Line />
        <Avartar>
          <Preview>
            {imageSrc && <img src={imageSrc} alt="preview-img" />}
          </Preview>
          <h2>이미지 미리보기</h2>
          <input type="file" onChange={handleFileChange} />
          <Button>프로필 수정</Button>
        </Avartar>
      </Container>
    </div>
  );
}

const Avartar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Button = styled.button`
  height: 5rem;
  width: 90%;
  margin: 3rem 0 3rem 0;
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.3);
  background-color: var(--color--header);
  border-radius: 0.5rem;
  color: white;
  &:active {
    box-shadow: none;
    box-shadow: inset 0.3rem 0.3rem 0.3rem 0rem rgba(0, 0, 0, 0.3);
  }
`;
const Line = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  width: 90%;
  margin: 0 auto;
`;

const Title = styled.h1`
  margin-left: 5.8rem;
  margin-top: 3rem;
`;

const Preview = styled.div`
  margin: 3rem 0 3rem 0;
  width: 20rem;
  height: 20rem;
  img {
    border-radius: 50%;
  }
`;

export default AvartarChange;
