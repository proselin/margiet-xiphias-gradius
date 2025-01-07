import { AxiosContext } from '@/providers/axios.provider';
import { AxiosInstance } from 'axios';
import { useContext } from 'react';

export const useAxios = (): AxiosInstance => {
  const context = useContext(AxiosContext);
  if (!context) {
    throw new Error("useAxios must be used within an AxiosProvider");
  }
  return context;
};
