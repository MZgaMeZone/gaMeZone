import Container from './components/container';
import styled from 'styled-components';
import profile from '../../style/icons/profile.svg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;
const userToken: string | null = localStorage.getItem('userToken');

const config = {
  headers: {
    Authorization: `Bearer ${userToken}`,
  },
};

function AvartarChange() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { userIcon, email },
        } = await axios.get(url + '/api/users', config);
        const newData = userIcon;
        setImageSrc(newData);
        setEmail(email);
        console.log(email);

        const form = document.getElementById('profileForm') as HTMLFormElement;
        form.action = `http://localhost:8080/api/users/profile`;
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  const updatePofile = () => {
    alert('프로필 이미지가 변경되었습니다.');
  };

  const deletePofile = async () => {
    await axios.put(url + '/api/users/profile');
  };

  const [imageSrc, setImageSrc] = useState('');
  const [isUploaded, IsSetPreview] = useState(false);
  const [email, setEmail] = useState('');

  const encodeFileToBase64 = (fileBlob: File) => {
    const reader = new FileReader(); //File, Blob 객체를 핸들링
    reader.readAsDataURL(fileBlob); //File, Blob 객체를 읽고 base64로 인코딩한 문자열을 FileReader.result속성에 담아줌
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        //파일이 성공적으로 읽혀지면 트리거됨
        console.log('파일업 선택함');
        setImageSrc(reader.result as string); //인코딩 된 문자열을 setImage에 넣어서 미리보기
        console.log('미리보기세팅');
        resolve();
      };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //input 이미지가 변경되면 이 함수에서 파일 체크
    console.log(e.target.files);
    console.log('이미지 변경되고있음');

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
            {imageSrc === 'undefined' ? (
              <img src={profile} alt="profile" />
            ) : (
              <img src={url + '/' + imageSrc} alt="profile" />
            )}
          </Preview>
          <h2>이미지 미리보기</h2>

          <form
            id="profileForm"
            // action=`http://localhost:8080/api/users/profile/${email}` //rynn
            method="POST"
            encType="multipart/form-data"
          >
            <input
              type="file"
              name="img"
              accept="image/*"
              onChange={handleFileChange}
            />

            <Button name="uploadeBtn" onClick={updatePofile}>
              프로필 이미지 수정
            </Button>
            <Button name="deleteBtn" onClick={deletePofile}>
              프로필 이미지 삭제
            </Button>
          </form>
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

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
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
  &:not(:first-of-type) {
    margin-bottom: 3rem;
    margin-top: 0px;
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
  img {
    border-radius: 50%;
    width: 20rem;
    height: 20rem;
  }
`;

export default AvartarChange;
