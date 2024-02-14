"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  addToListShabbatNight,
  addToListSaturday,
  addToListClasses,
  addToListActivityChildren,
} from "@/redux/features/listDataInputsSlice";
import { DataInput } from "../type/dateInput";
import CloseIcon from "@/images/closeIcon";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  subject: string;
  isLesson: boolean;
  action: (payload: DataInput) => void;
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  subject,
  isLesson,
  action,
}) => {
  let initialDataInput: DataInput;
  if (subject === "פעילות") {
    initialDataInput = {
      id: 1,
      name: "",
      time: "",
      nameLecture: "",
    };
  } else {
    initialDataInput = {
      name: "",
      time: "",
      id: 1,
    };
  }
  const [userData, setUserData] = useState<DataInput>(initialDataInput);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof DataInput
  ) => {
    const { value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [field]: value,
    }));
  };

  // const addDataIntoList()=>{

  // }
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 ">
        <div className="flex flex-col  gap-y-8">
          <div className="top-row-dialog flex justify-between">
            <span className="flex justify-center">הוסף {subject}</span>

            <button
              type="button"
              className="box-content  rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              data-te-modal-dismiss
              aria-label="Close"
              onClick={onClose}
            >
             <CloseIcon/>
            </button>
          </div>
          <label className="relative cursor-pointer ">
            <input
              type="text"
              placeholder={"שם " + { subject }}
              className="h-12 w-full px-4 text-1xl text-black bg-white border-gray-200 bg-zinc-100/40 border-2 rounded-lg border-opacity-50 outline-none focus:border-black placeholder-gray-300 placeholder-opacity-0 transition duration-200"
              onChange={(e) => handleInputChange(e, "name")}
            />
            <span className="text-1xl text-black  text-opacity-80 bg-white absolute right-3 top-3 px-1 transition duration-200 input-text">
              שם ה{subject}
            </span>
          </label>
          {isLesson && (
            <label className="relative cursor-pointer ">
              <input
                type="text"
                placeholder="Input"
                className="h-12 w-full px-4 text-1xl text-black bg-white border-gray-200 bg-zinc-100/40 border-2 rounded-lg border-opacity-50 outline-none focus:border-black placeholder-gray-300 placeholder-opacity-0 transition duration-200"
                onChange={(e) => handleInputChange(e, "nameLecture")}
              />
              <span className="text-1xl text-black  text-opacity-80 bg-white absolute right-3 top-3 px-1 transition duration-200 input-text">
                שם מוסר השיעור
              </span>
            </label>
          )}
          <div className="flex justify-between items-center w-full">
            <input
              className="input-time h-12"
              type="time"
              id="appt2"
              name="appt2"
              onChange={(e) => handleInputChange(e, "time")}
            />
            <button
              className="w-26 rounded-md bg-[#F9B530] px-3.5 py-2.5 text-sm font-semibold flex justify-center items-center m-center my-3  
                             text-white shadow-sm hover:bg-[#f9b630c5]
                             "
              onClick={() => action(userData)}
            >
              לחץ להוספה
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
