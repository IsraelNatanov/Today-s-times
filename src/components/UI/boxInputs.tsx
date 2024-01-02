'use client'
import React, { useState, useEffect } from 'react'
import Image from "next/image";
import MyIcon from '@/images/myIcon';
import Dialog from '../UI/dialog';
import { DataInput } from '../type/dateInput';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { addToListShabbatNight, addToListSaturday, addToListClasses, addToListActivityChildren, deleteItemFromShabbatNight, deleteItemFromListSaturday, deleteItemFromListClasses, deleteItemFromActivityChildren } from '@/redux/features/listDataInputsSlice'
import { TrashIcon } from '@/images/trashIcon';
import InputTime from './inputTime';
import ButtonTextIcon from './buttonTextIcon';



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
  const dispatch = useDispatch();
  const listShabbatNight = useSelector((state: RootState) => state.listDataInput.listShabbatNight);
  const listSaturday = useSelector((state: RootState) => state.listDataInput.listSaturday);
  const listClasses = useSelector((state: RootState) => state.listDataInput.listClasses);
  const listActivityChildren = useSelector((state: RootState) => state.listDataInput.listActivityChildren);

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

  const handleDrag = (boxId: number, e: any, ui: any) => {
    const newBoxes = [...jsonInputs!];
    
    const draggedBox = newBoxes[boxId];
    const { x } = ui;

    const change = draggedBox.right - x;

    if (boxId > 0 && boxId < newBoxes.length - 1) {
      newBoxes[boxId - 1].right -= change;
      newBoxes[boxId + 1].right += change;
    }

    draggedBox.right = x;

    // setBoxes(newBoxes);
  };
  return (
    <div className='box'>
      <p className="normal-case text-center"> {textSubject} </p>
      <div className='row-box'>
        <ButtonTextIcon action={openDialog} textButton={ textButton}  > <MyIcon color="rgb(255 255 255)" /></ButtonTextIcon>
   
        <Dialog isOpen={isDialogOpen} onClose={closeDialog} subject={textButton} isLesson={isLesson} action={handleAddToList} />
        <div className='row-input' >

          {jsonInputs && jsonInputs.map((item, index) => (
           <InputTime  key={index}
            index={index}
            handleDeleteToList={handleDeleteToList}
            handleAddToList={handleAddToList}
            nameInput={item.name}
            handleDrag={handleDrag}
            time={item.time}/>

       

          ))}




        </div>

      </div>

    </div>
  )
}
