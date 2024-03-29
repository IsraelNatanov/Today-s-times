import React, { useRef, useState } from "react";
import { DataInput } from "../type/dateInput";
import { TrashIcon } from "@/images/trashIcon";


interface IProps {
  handleDeleteToList: (index: number) => void;
  handleAddToList: (payload: DataInput) => void;
  jsonInputs: DataInput[];
  handleUpdateToList: (list: DataInput[]) => void;
}

const InputTime = ({
  handleDeleteToList,
  handleAddToList,
  jsonInputs,
  handleUpdateToList,
}: IProps) => {

  const dragItem = useRef<number>(0);
  const draggedOverItem = useRef<number>(0);

  
  function handleSort() {
    const idOver = draggedOverItem.current+1;
    let itemeClone = jsonInputs.map(obj => ({ ...obj })); 
    console.log(draggedOverItem.current);
    if(draggedOverItem.current > dragItem.current){
      itemeClone = itemeClone.map(obj => {
        if (obj.id > (draggedOverItem.current +1) || obj.id+1 <= dragItem.current) {
          return obj; 
        } else {
          return { ...obj, id: obj.id - 1 }; 
        }
      });
  
    }

    
    else{
      itemeClone = itemeClone.map(obj => {
       if (obj.id <= (draggedOverItem.current ) || obj.id > dragItem.current) {
          return obj; 
        } else {
          return { ...obj, id: obj.id + 1 }; 
        }
      });
    }
  
    itemeClone[dragItem.current].id = idOver;
    console.log(itemeClone);
    
    itemeClone.sort((a, b) => a.id - b.id);
    handleUpdateToList(itemeClone);
  }
  
  return (
    <div className="row-input">
      {jsonInputs.map((item, index) => (
        <div
          className="flex flex-col items-center justify-center bg-slate-100 min-w-[140px] min-h-[85px] rounded-lg drop-shadow-md"
          draggable
          onDragStart={() => (dragItem.current = index)}
          onDragEnter={() => (draggedOverItem.current = index)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
          key={index}
        >
           <div className='has-tooltip'>
        <span className='tooltip rounded shadow-lg p-1 text-xs bg-gray-100 top-[-10px] right-24' >מחק</span>
        <div className='absolute top-1 left-0' onClick={() => handleDeleteToList(index)}>
          <TrashIcon color='#f9b630c5' />
        </div>
      </div>

          <label className="name-input">{item.name}</label>
          <input
            className="input-time"
            type="time"
            defaultValue={item.time}
            onChange={(e) =>
              handleAddToList({
                id: jsonInputs.length + 1,
                name: item.name,
                time: e.target.value,
              })
            }
          />
        </div>
      ))}
    </div>
  );
};

export default InputTime;
