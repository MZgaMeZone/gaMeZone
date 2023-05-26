const token = localStorage.getItem('userToken');

export const Config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export interface User {
  _id: string;
  nickname: string;
  email: string;
  userIcon: string;
}

export type Props = {
  URL: string;
};
