"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import MyIcon from "@/images/myIcon";
import Dialog from "../UI/dialog";
import { DataInput } from "../type/dateInput";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  addToListShabbatNight,
  addToListSaturday,
  addToListClasses,
  addToListActivityChildren,
  deleteItemFromShabbatNight,
  deleteItemFromListSaturday,
  deleteItemFromListClasses,
  deleteItemFromActivityChildren,
} from "@/redux/features/listDataInputsSlice";
import { TrashIcon } from "@/images/trashIcon";
import InputTime from "./inputTime";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface IProps {
  textSubject: string;
  jsonInputs: DataInput[];
  textButton: string;
  action: (payload: DataInput) => void;
  idSubject: number;
}

export default function BoxInputs({
  textSubject,
  jsonInputs,
  textButton,
  action,
  idSubject,
}: IProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isLesson, setIsLesson] = useState<boolean>(false);
  const [data, setData] = useState<any>(jsonInputs)
  const dispatch = useDispatch();
  const listShabbatNight = useSelector(
    (state: RootState) => state.listDataInput.listShabbatNight
  );
  const listSaturday = useSelector(
    (state: RootState) => state.listDataInput.listSaturday
  );
  const listClasses = useSelector(
    (state: RootState) => state.listDataInput.listClasses
  );
  const listActivityChildren = useSelector(
    (state: RootState) => state.listDataInput.listActivityChildren
  );

  const handleAddToList = (data: DataInput, nameList = textSubject) => {
    switch (nameList) {
      case "תפילות ליל שבת":
        dispatch(addToListShabbatNight(data));
        break;
      case "תפילות יום שבת":
        dispatch(addToListSaturday(data));
        break;
      case "שיעורים":
        dispatch(addToListClasses(data));
        break;
      case "פעילות לילדים":
        dispatch(addToListActivityChildren(data));
        break;
    }
    setIsDialogOpen(false);
  };

  const handleDeleteToList = (id: number, nameList = textSubject) => {
    switch (nameList) {
      case "תפילות ליל שבת":
        dispatch(deleteItemFromShabbatNight(id));
        break;
      case "תפילות יום שבת":
        dispatch(deleteItemFromListSaturday(id));
        break;
      case "שיעורים":
        dispatch(deleteItemFromListClasses(id));
        break;
      case "פעילות לילדים":
        dispatch(deleteItemFromActivityChildren(id));
        break;
    }
  };
  useEffect(() => {
    if (textButton === "שיעור") {
      setIsLesson(true);
    }
  }, []);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

 

    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
    } = useSortable({ id: data.id });
    const style = {
      transition,
      transform: CSS.Transform.toString(transform),
    };
  

  
   

    const onDragEnd = (event:any) => {
      const { active, over } = event;
      if (active.id === over.id) {
        return;
      }
      setData((users:any) => {
        const oldIndex = users.findIndex((user:any) => user.id === active.id);
        const newIndex = users.findIndex((user:any) => user.id === over.id);
        return arrayMove(users, oldIndex, newIndex);
      });
    };
  return (
    <div className="box" ref={setNodeRef} style={style}>
      <p className="normal-case text-center"> {textSubject} </p>
      <div className="row-box" {...attributes} {...listeners}>
        <button className="button-add" onClick={openDialog}>
          <span className="font-bold mr-1">הוסף {textButton}</span>
          <MyIcon color="rgb(255 255 255)" />
        </button>
        <Dialog
          isOpen={isDialogOpen}
          onClose={closeDialog}
          subject={textButton}
          isLesson={isLesson}
          action={handleAddToList}
        />

          <div className="row-input" >
          <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={data} strategy={verticalListSortingStrategy}>
              {jsonInputs?.map((item, index) => (
                <InputTime
                  key={index}
                  index={index}
                  handleDeleteToList={handleDeleteToList}
                  handleAddToList={handleAddToList}
                  nameInput={item.name}
                  time={item.time}
                />

              //   <div
              //   ref={setNodeRef}
              //   style={style}
              //   {...attributes}
              //   {...listeners}
              //   className="user"
              // >
              //   {user.name}
              // </div>
                // <div className='flex flex-col items-center justify-center  bg-slate-100 min-w-[140px] h-[85px] rounded-lg drop-shadow-md' key={index}>
                //   {/* <div className='absolute top-1 left-0' ><TrashIcon color='#f9b630c5' /></div> */}
                //   <div className='has-tooltip'>
                //     <span className='tooltip rounded shadow-lg p-1 text-xs bg-gray-100 top-[-10px] right-24' onClick={()=>handleDeleteToList(index)}>מחק</span>
                //    <div className='absolute top-1 left-0 'onClick={()=>handleDeleteToList(index)} ><TrashIcon color='#f9b630c5' /></div>
                //   </div>

                //   <label className="name-input"> {item.name} </label>
                //   <input className='input-time' type="time"  defaultValue={item.time}  onChange={(e) => handleAddToList({ name: item.name, time: e.target.value })} />
                // </div>
              ))}
                </SortableContext>
        </DndContext>
          </div>

      </div>
    </div>
  );
}
