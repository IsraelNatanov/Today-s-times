"use client"
import { PrayerTimesType } from "@/types/prayerTimes";
import { request } from "@/utils/axios-utils";
import { useQuery } from "react-query";


export const fetchPrayerTimes  = (): Promise<PrayerTimesType> => {
    return request({ url: 'api/prayerTimes' }).then(response => response.data);
  };
  

  export const useGetPrayerTimes = (onSuccess?: (data: PrayerTimesType) => void, onError?: (error: unknown) => void) => {
    return useQuery<PrayerTimesType>(['data-prayerTimes'], () => fetchPrayerTimes(), { 
      onSuccess,
      onError,
      keepPreviousData: true,
    });
  };