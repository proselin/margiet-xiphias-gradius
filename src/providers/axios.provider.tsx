import React, { createContext, ReactNode, useContext } from 'react';
import axios, { AxiosInstance } from 'axios';

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Context for Axios
export const AxiosContext = createContext<AxiosInstance | null>(null);

export const AxiosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  axiosInstance.interceptors.request.use(request => {
    request.headers.set("frsys", "margiet-xiphias-gradius");
    return request;
  });
  return (<AxiosContext.Provider value={axiosInstance}>{children}</AxiosContext.Provider>);
};

