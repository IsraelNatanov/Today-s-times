"use client"
import { PrayerTimesType } from '@/types/prayerTimes';
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

interface RequestOptions extends AxiosRequestConfig {}

let baseURL: string;

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3034'; // Use localhost in development
} else {
  baseURL = 'https://today-s-times-bhla.vercel.app/'; // Use deployed URL in production
}

const client = axios.create({ baseURL });

export const request = (options: RequestOptions): Promise<AxiosResponse> => {
  const onSuccess = (response: AxiosResponse) => response;
  const onError = (error: AxiosError) => {
    // Optionally catch errors and add additional logging here
    return Promise.reject(error);
  };

  return client(options).then(onSuccess).catch(onError);
};




