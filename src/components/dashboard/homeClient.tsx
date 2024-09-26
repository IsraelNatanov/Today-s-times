'use client'
import { useGetPrayerTimes } from '@/hooks/usePrayerTimesData'
import { PrayerTimesType } from '@/types/prayerTimes'
import React from 'react'

export default function HomeClient() {
    const onSuccess = (data:PrayerTimesType | undefined) => {
        console.log({ data })
      }
      
      const onError = (error: unknown) => {
         console.log({ error })
      }
      
      const { isLoading, data, isError, error, isPreviousData } = useGetPrayerTimes(
        onSuccess,
        onError,
      
        
      )
      
      
      if (isLoading) {
        return <h2>Loading...</h2>
      }
      
      if (isError) {
        return <h2>{(error as Error)?.message}</h2>
      }
  return (
    <div>home</div>
  )
}
