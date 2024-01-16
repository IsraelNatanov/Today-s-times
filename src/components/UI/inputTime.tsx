import React from 'react';
import { DataInput } from '../type/dateInput';
import { TrashIcon } from '@/images/trashIcon';
import Draggable from 'react-draggable';

interface IProps {

     index:number,
     handleDeleteToList:(index:number)=>void,
     handleAddToList:(payload: DataInput)=>void
     nameInput:string
     time:string,
     handleDrag:(index:number, e:any, ui:any)=> void
  
  };
  const boxWidth = 140;

const InputTime = ({  index, handleDeleteToList, handleAddToList, nameInput, time, handleDrag }:IProps) => {

  return (
    <Draggable
    bounds="parent" // Restricts dragging within the parent element
    onDrag={(e, ui) => handleDrag(index, e, ui)}
  >
    <div className='flex flex-col items-center justify-center bg-slate-100 min-w-[140px] h-[85px] rounded-lg drop-shadow-md' key={index}>
      <div className='has-tooltip'>
        <span className='tooltip rounded shadow-lg p-1 text-xs bg-gray-100 top-[-10px] right-24' onClick={() => handleDeleteToList(index)}>מחק</span>
        <div className='absolute top-1 left-0' onClick={() => handleDeleteToList(index)}>
          <TrashIcon color='#f9b630c5' />
        </div>
      </div>

      <label className="name-input">{nameInput}</label>
      <input className='input-time' type="time"  defaultValue={time} onChange={(e) => handleAddToList({ name: nameInput, time: e.target.value, right:280 })} />
    </div>
    </Draggable>
  );
};

export default InputTime;
