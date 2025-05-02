'use client';
import React, { useEffect, useState } from 'react'
// import { DataInput } from '../type/dateInput';
import BoxInputs from '../UI/boxInputs';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
// import { addToListShabbatNight, addToListSaturday, addToListClasses, addToListActivityChildren } from '@/redux/features/listDataInputsSlice'



export default function FormAdmin() {

  const listScheduleState = useSelector((state: RootState) => state.scheduleSlice);



  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(listScheduleState);


  }
  type ScheduleKeys = 'תפילות ליל שבת' | 'תפילות יום שבת' | 'שיעורים' | 'פעילות לילדים';
  const sections = [
    { textSubject: 'תפילות ליל שבת', jsonKey: 'תפילות ליל שבת' as ScheduleKeys, textButton: 'תפילה', idSubject: 0 },
    { textSubject: 'תפילות יום שבת', jsonKey: 'תפילות יום שבת' as ScheduleKeys, textButton: 'תפילה', idSubject: 1 },
    { textSubject: 'שיעורים', jsonKey: 'שיעורים' as ScheduleKeys, textButton: 'שיעור', idSubject: 2 },
    { textSubject: 'פעילות לילדים', jsonKey: 'פעילות לילדים' as ScheduleKeys, textButton: 'פעילות', idSubject: 3 },
  ];
  return (

    <div className="bg-slate-100 h-[100vh] " dir="rtl">
      <div className="flex justify-center items-center min-h-[100vh]  font-practicain font-normal">

        <form onSubmit={handleSubmit} className="bg-white w-[730px] rounded-2xl shadow-2xl pt-5 px-14" >



          <p className="normal-case text-center">זמני היום </p>
          {sections.map(({ textSubject, jsonKey, textButton, idSubject }) => (
            <BoxInputs
              key={idSubject}
              textSubject={textSubject}
              jsonInputs={listScheduleState[jsonKey]}
              textButton={textButton}
              idSubject={idSubject}
            />
          ))}



          {/* <BoxInputs textSubject={'פעילות לילדים'} jsonInputs={listScheduleState['פעילות לילדים']} textButton={'פעילות'} 
     
           idSubject={3} /> */}

          <button className="w-40 rounded-md bg-[#F9B530] px-3.5 py-2.5 text-sm font-semibold flex justify-center items-center m-center my-3  
                             text-white shadow-sm hover:bg-[#f9b630c5]
                             " onClick={handleSubmit}>שלח זמנים
          </button>

        </form>

      </div>



    </div>



  )
}
