const token = localStorage.getItem('userToken');

export const Config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export interface User {
  nickname: string;
  email: string;
}

export type Props = {
  URL: string;
};
