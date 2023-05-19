import axios from 'axios';
import React, { useState, useEffect } from 'react';

const userToken = localStorage.getItem('userToken');

const config = {
  headers: {
    Authorization: `Bearer ${userToken}`,
  },
};

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [searchUser, setSearchUser] = useState<string>('');

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/users/allUsers', config)
      .then((res) => {
        setUsers(res.data);
      });
  }, []);

  const filteredUsers = (searchUser: string) => {
    return users.filter((user) =>
      user.nickname.toLowerCase().includes(searchUser.toLowerCase())
    );
  };

  const renderedUsers =
    searchUser.length > 0 ? filteredUsers(searchUser) : users;

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
        style={{ fontSize: '2rem' }}
      />
      <h1>
        {renderedUsers.map((user) => (
          <div key={user._id} style={{ fontSize: '3rem' }}>
            {user.email} - {user.nickname}
          </div>
        ))}
      </h1>
    </div>
  );
}

// 토큰 검증 후 로그인 유저 정보 조회 API 확인 완료
//   useEffect(() => {
//     axios
//       .get('http://localhost:8080/api/users/auth/verifyToken', config)
//       .then((res) => {
//         console.log(res);
//       });
//   });
