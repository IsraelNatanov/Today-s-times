import React from 'react';
import { DataInput } from '../type/dateInput';
import { TrashIcon } from '@/images/trashIcon';import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


interface IProps {

     index:number,
     handleDeleteToList:(index:number)=>void,
     handleAddToList:(payload: DataInput)=>void
     nameInput:string
     time:string
  
  };

const InputTime = ({  index, handleDeleteToList, handleAddToList, nameInput, time }:IProps) => {



 

  
  return (
    <div className='flex flex-col items-center justify-center bg-slate-100 min-w-[140px] h-[85px] rounded-lg drop-shadow-md' key={index}>
      <div className='has-tooltip'>
        <span className='tooltip rounded shadow-lg p-1 text-xs bg-gray-100 top-[-10px] right-24' onClick={() => handleDeleteToList(index)}>מחק</span>
        <div className='absolute top-1 left-0' onClick={() => handleDeleteToList(index)}>
          <TrashIcon color='#f9b630c5' />
        </div>
      </div>

      <label className="name-input">{nameInput}</label>
      <input className='input-time' type="time"  defaultValue={time} onChange={(e) => handleAddToList({ name: nameInput, time: e.target.value })} />
    </div>
  );
};

export default InputTime;
