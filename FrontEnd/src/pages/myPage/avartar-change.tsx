import Container from './components/container';
import styled from 'styled-components';
import profile from '../../style/icons/profile.svg';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  const deletePofile = async () => {
    await axios.post(url + `/api/users/profile/edit/${email}`);
    alert('프로필 이미지가 삭제되었습니다.');
    window.location.reload();
  };

  const [imageSrc, setImageSrc] = useState('');
  const [isUploaded, IsSetUploaded] = useState(false);
  const [email, setEmail] = useState('');
  const [file, setFile] = useState<File | undefined>(undefined);
  const navigate = useNavigate();

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files !== null) {
      const file = e.target.files[0];
      setFile(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };

      const formData = new FormData();
      formData.append('img', file);
      IsSetUploaded(true);
      try {
        await axios.post(url + `/api/users/profile/${email}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userToken}`,
          },
        });
        alert('프로필이 업로드 되었습니다');
        window.location.reload();
      } catch (error) {
        console.log(error);
        alert('프로필 업로드에 실패했습니다.');
      }
    }
  };

  return (
    <div>
      <Container>
        <Title>프로필 사진 변경</Title>
        <Line />
        <Avartar>
          <Preview>
            {isUploaded ? (
              <img src={imageSrc} />
            ) : (
              <img src={url + '/' + imageSrc} alt="profile" />
            )}
          </Preview>
          <h2>이미지 미리보기</h2>

          <label htmlFor="profileImageBtn"> 프로필 이미지 수정</label>
          <input
            type="file"
            id="profileImageBtn"
            name="img"
            accept="image/*"
            onChange={handleFileChange}
          />

          <Button className="deleteBtn" onClick={deletePofile}>
            프로필 이미지 삭제
          </Button>
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

  label {
    height: 5rem;
    width: 90%;
    margin-top: 3rem;
    box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.3);
    background-color: var(--color--header);
    border-radius: 0.5rem;
    color: white;
    text-align: center;
    font-size: 1.8rem;
    padding-top: 1.5rem;
    cursor: pointer;
  }

  input {
    display: none;
  }
`;

const Button = styled.button`
  height: 5rem;
  width: 90%;
  margin-top: 3rem;
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.3);
  background-color: var(--color--header);
  border-radius: 0.5rem;
  color: white;

  &:active {
    box-shadow: none;
    box-shadow: inset 0.3rem 0.3rem 0.3rem 0rem rgba(0, 0, 0, 0.3);
  }
  &.deleteBtn {
    margin-top: 3rem;
    margin-bottom: 3rem;
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
