import { AxiosRequestConfig, AxiosResponse } from 'axios';

import api from './axiosInstance';

const apiURL = process.env.REACT_APP_API_URL;

// axios.get
export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  const fullURL = apiURL + url;
  try {
    const response = await api.get<T>(fullURL, config);
    return response;
  } catch (err) {
    throw new Error('API 요청에 실패했습니다.');
  }
};

//axios.post
export const post = async <T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  const fullURL = apiURL + url;
  try {
    const response = await api.post<T>(fullURL, data, config);
    return response;
  } catch (err) {
    throw new Error('API 요청에 실패했습니다.');
  }
};

//axios.patch
export const patch = async <T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  const fullURL = apiURL + url;
  try {
    const response = await api.patch<T>(fullURL, data, config);
    return response;
  } catch (err) {
    throw new Error('API 요청에 실패했습니다.');
  }
};

//axios.delete
export const del = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<void> => {
  const fullURL = apiURL + url;
  try {
    await api.delete<T>(fullURL, config);
  } catch (err) {
    throw new Error('API 요청에 실패했습니다.');
  }
};
