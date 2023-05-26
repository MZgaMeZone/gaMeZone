const token = localStorage.getItem('userToken');

export const Config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const URL = `${process.env.REACT_APP_API_URL}/api/users`;
export interface User {
  _id: string;
  nickname: string;
  email: string;
  userIcon: string;
}

export type Props = {
  URL: string;
};
