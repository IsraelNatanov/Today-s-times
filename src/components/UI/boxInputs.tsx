'use client'
import React, { useState, useEffect } from 'react'
import Image from "next/image";
import MyIcon from '@/images/myIcon';
import Dialog from '../UI/dialog';
import { DataInput } from '../type/dateInput';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { addToListShabbatNight, addToListSaturday, addToListClasses, addToListActivityChildren,updateListSaturday, deleteItemFromShabbatNight, deleteItemFromListSaturday, deleteItemFromListClasses, deleteItemFromActivityChildren } from '@/redux/features/listDataInputsSlice'
import { TrashIcon } from '@/images/trashIcon';
import InputTime from './inputTime';
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";



interface IProps {
  textSubject: string;
  jsonInputs: DataInput[] | null
  textButton: string
  action: (payload: DataInput) => void;
  idSubject: number

};

export default function BoxInputs({ textSubject, jsonInputs,
  textButton,
  action, idSubject }: IProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isLesson, setIsLesson] = useState<boolean>(false)
  const [isLength, setIsLength] = useState<boolean>(false)
  const dispatch = useDispatch();
  const listShabbatNight = useSelector((state: RootState) => state.listDataInput.listShabbatNight);
  const listSaturday = useSelector((state: RootState) => state.listDataInput.listSaturday);
  const listClasses = useSelector((state: RootState) => state.listDataInput.listClasses);
  const listActivityChildren = useSelector((state: RootState) => state.listDataInput.listActivityChildren);

  useEffect(()=>{
if(jsonInputs!.length > 0){
  setIsLength(true)
}
  },[])
  const handleAddToList = (data: DataInput, nameList = textSubject) => {
    switch (nameList) {
      case 'תפילות ליל שבת':
        dispatch(addToListShabbatNight(data));
        break;
      case 'תפילות יום שבת':
        dispatch(addToListSaturday(data));
        break;
      case 'שיעורים':
        dispatch(addToListClasses(data));
        break;
      case 'פעילות לילדים':
        dispatch(addToListActivityChildren(data));
        break;

    }
    setIsDialogOpen(false);
  }

  const handleDeleteToList = (id: number, nameList = textSubject) => {
    switch (nameList) {
      case 'תפילות ליל שבת':
        dispatch(deleteItemFromShabbatNight(id));
        break;
      case 'תפילות יום שבת':
        dispatch(deleteItemFromListSaturday(id));
        break;
      case 'שיעורים':
        dispatch(deleteItemFromListClasses(id));
        break;
      case 'פעילות לילדים':
        dispatch(deleteItemFromActivityChildren(id));
        break;

    }
    
  }
  useEffect(() => {

    if (textButton === 'שיעור') {
      setIsLesson(true)
    }
  }, [])

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  function onChange(sourceId: any, sourceIndex: any, targetIndex: any, targetId: any) {
    const nextState = swap(jsonInputs!, sourceIndex, targetIndex);
    dispatch(updateListSaturday(nextState));
  }
  return (
    <div className='box'>
      <p className="normal-case text-center"> {textSubject} </p>
      <div className='row-box'>
        <button className="button-add" onClick={openDialog}>
          <span className="font-bold mr-1">הוסף {textButton}</span>
          <MyIcon color="rgb(255 255 255)" />
        </button>
        <Dialog isOpen={isDialogOpen} onClose={closeDialog} subject={textButton} isLesson={isLesson} action={handleAddToList} />
   
        <div className='row-input' >
        <GridContextProvider onChange={onChange} >
        <GridDropZone
          id="items"
          boxesPerRow={4}
          rowHeight={50}
          style={{ height: "50px" }}
        >
          { jsonInputs!.map((item, index) => (
            //  <GridItem key={index}>
           <InputTime  key={index}
            index={index}
            handleDeleteToList={handleDeleteToList}
            handleAddToList={handleAddToList}
            nameInput={item.name}
            time={item.time}/>

        

          ))}

</GridDropZone>
      </GridContextProvider>
  

        </div>
  
          
      </div>

    </div>
  )
}
