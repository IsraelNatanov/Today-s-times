"use client";
import React, { useState, useEffect, useRef } from "react";
import Dialog from "../UI/dialog";
import { DataInput } from "../type/dateInput";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  addToListShabbatNight,
  addToListSaturday,
  addToListClasses,
  addToListActivityChildren,
  updateListSaturday,
  deleteItemFromShabbatNight,
  deleteItemFromListSaturday,
  deleteItemFromListClasses,
  deleteItemFromActivityChildren,
  updateListShabbatNight,
  updateListClasses,
  updateListActivityChildren,
} from "@/redux/features/listDataInputsSlice";
import InputTime from "./inputTime";
import AddItemIcon from "@/images/addItemIcon";


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
  const [isLength, setIsLength] = useState<boolean>(false);
  const [data, setData] = useState(jsonInputs);
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

  useEffect(() => {
    if (jsonInputs!.length > 0) {
      setIsLength(true);
    }
  }, []);
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
  const handleUpdateToList = (list: DataInput[], nameList = textSubject) => {
    switch (nameList) {
      case "תפילות ליל שבת":
        dispatch(updateListShabbatNight(list));
        break;
      case "תפילות יום שבת":
        dispatch(updateListSaturday(list));
        break;
      case "שיעורים":
        dispatch(updateListClasses(list));
        break;
      case "פעילות לילדים":
        dispatch(updateListActivityChildren(list));
        break;
    }
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

  return (
    <div className="box">
      <p className="normal-case text-center"> {textSubject} </p>
      <div className="row-box">
        <button className="button-add" onClick={openDialog}>
          <span className="font-bold mr-1">הוסף {textButton}</span>
          <AddItemIcon color="rgb(255 255 255)" />
        </button>
        <Dialog
          isOpen={isDialogOpen}
          onClose={closeDialog}
          subject={textButton}
          isLesson={isLesson}
          action={handleAddToList}
        />

        <InputTime
          handleDeleteToList={handleDeleteToList}
          handleAddToList={handleAddToList}
          jsonInputs={jsonInputs}
          handleUpdateToList={handleUpdateToList}
        />
      </div>
    </div>
  );
}
