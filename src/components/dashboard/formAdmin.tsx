'use client';
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import MyIcon from '@/images/addItemIcon';
import { DataInput } from '../type/dateInput';
import BoxInputs from '../UI/boxInputs';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import {addToListShabbatNight, addToListSaturday, addToListClasses, addToListActivityChildren} from '@/redux/features/listDataInputsSlice'
import axios from 'axios';


export default function FormAdmin() {

useEffect(()=>{
  getApi() 
})
const getApi =async ()=>{
  try{


  const url = "api/prayerTimes"
  const resp =await axios.get(url)
 
 
   console.log(resp);
  }
  catch(err){
    console.log(err);
    
  }
}
    const listShabbatNight = useSelector((state: RootState) => state.listDataInput.listShabbatNight);
    const listSaturday = useSelector((state: RootState) => state.listDataInput.listSaturday);
    const listClasses = useSelector((state: RootState) => state.listDataInput.listClasses);
    const listActivityChildren = useSelector((state: RootState) => state.listDataInput.listActivityChildren);
    const dispatch = useDispatch();


    const handleAddToListShabbatNight = (data: DataInput) => {
        dispatch(addToListShabbatNight(data));
      };
      const handleAddToListSaturday = (data: DataInput) => {
        dispatch(addToListSaturday(data));
      };
      const handleAddToListClasses = (data: DataInput) => {
        dispatch(addToListClasses(data));
      };
      const handleAddToListActivityChildren = (data: DataInput) => {
        dispatch(addToListActivityChildren(data));
      };

  useEffect(()=>{
console.log(listClasses);

  },[])  


const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(listShabbatNight);
    console.log(listSaturday);
    console.log(listClasses);
    console.log(listActivityChildren);

}
return (

    <div  className="bg-slate-100 h-[100vh] " dir="rtl">
        <div className="flex justify-center items-center min-h-[100vh]  font-practicain font-normal">

            <form onSubmit={handleSubmit} className="bg-white w-[730px] rounded-2xl shadow-2xl pt-5 px-14" >



                <p className="normal-case text-center">זמני היום </p>
                <BoxInputs textSubject={'תפילות ליל שבת'} jsonInputs={listShabbatNight} textButton={'תפילה'} action={handleAddToListShabbatNight} idSubject={0} />

                

<BoxInputs textSubject={'תפילות יום שבת'} jsonInputs={listSaturday} textButton={'תפילה'} action={handleAddToListSaturday} idSubject={1}/>

                
                

<BoxInputs textSubject={'שיעורים'} jsonInputs={listClasses} textButton={'שיעור'} action={handleAddToListClasses} idSubject={2}/>

               

<BoxInputs textSubject={'פעילות לילדים'} jsonInputs={listActivityChildren} textButton={'פעילות'} action={handleAddToListActivityChildren} idSubject={3} />

                <button className="w-40 rounded-md bg-[#F9B530] px-3.5 py-2.5 text-sm font-semibold flex justify-center items-center m-center my-3  
                             text-white shadow-sm hover:bg-[#f9b630c5]
                             " onClick={handleSubmit}>שלח זמנים
                </button>
                
            </form>

        </div>



    </div>



)
}
