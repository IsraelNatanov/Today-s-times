'use client';
import { DataInput } from "@/components/type/dateInput";
import { RootState } from "../store";
import { createSelector, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { list } from "postcss";


export interface ListDataInput {
  listShabbatNight: DataInput[];
  listSaturday: DataInput[];
  listClasses: DataInput[];
  listActivityChildren: DataInput[];

}

const boxWidth = 140;
export const initialState: ListDataInput = {
  listShabbatNight: [{ name: "מנחה", time: "" , right:0}, { name: "קבלת שבת", time: "" ,right:140}],
  listSaturday: [{ name: "שחרית", time: "" ,right:0}, { name: "מנחה", time: "", right:140 }, { name: "ערבית", time: "", right:280 }],
  listClasses: [{ name: "שיחה חסידית", time: "", nameLecture: "" ,right:0}, { name: "חסידות בוקר", time: "", nameLecture: "", right:140 }, { name: "שיעור בהלכה", time: "", nameLecture: "", right:28 }],
  listActivityChildren: []

};
export const ListDataInputsSlice = createSlice({
  name: 'listDataInput',
  initialState,
  reducers: {
  
    addToListShabbatNight(state, action: PayloadAction<DataInput>) {
      const dataOf: DataInput = action.payload
      const list = updateList(state.listShabbatNight, dataOf.name, dataOf.time, state.listShabbatNight.length - 1)
      state.listShabbatNight = list

    },
    addToListSaturday(state, action: PayloadAction<DataInput>) {
      const dataOf: DataInput = action.payload
      const list = updateList(state.listSaturday, dataOf.name, dataOf.time, state.listSaturday.length - 1)
      state.listSaturday = list
    },
    addToListClasses(state, action: PayloadAction<DataInput>) {
      const dataOf: DataInput = action.payload
      const list = updateList(state.listClasses, dataOf.name, dataOf.time, state.listClasses.length - 1)
      state.listClasses = list
    },
    addToListActivityChildren(state, action: PayloadAction<DataInput>) {
      const dataOf: DataInput = action.payload
      const list = updateList(state.listActivityChildren, dataOf.name, dataOf.time, state.listActivityChildren.length - 1)
      state.listActivityChildren = list
    },
    deleteItemFromShabbatNight(state, action: PayloadAction<number>){
      const id: number = action.payload
      const list = deleteOneInpute(state.listShabbatNight, id)
      state.listShabbatNight = list
    },
    deleteItemFromListSaturday(state, action: PayloadAction<number>){
      const id: number = action.payload
      const list = deleteOneInpute(state.listSaturday, id)
      state.listSaturday = list
    },
    deleteItemFromListClasses(state, action: PayloadAction<number>){
      const id: number = action.payload
      const list = deleteOneInpute(state.listClasses, id)
      state.listClasses = list
    },
    deleteItemFromActivityChildren(state, action: PayloadAction<number>){
      const id: number = action.payload
      const list = deleteOneInpute(state.listActivityChildren, id)
      state.listActivityChildren = list
    },
  },
});

const updateList = (arr: DataInput[], name: string, value: string, index:number) => {
  const existingIndex = arr.findIndex(item => item.name === name);

  if (existingIndex !== -1) {
    arr[existingIndex].time = value
 
  }
  else {
    arr.push({ name: name, time: value, right:boxWidth * index  })
  }
  return arr
}
const deleteOneInpute =(arr: DataInput[],id:number)=>{
 
    arr.splice(id, 1);
    return arr
  
}

export const { addToListShabbatNight, addToListSaturday, addToListClasses, addToListActivityChildren, deleteItemFromShabbatNight, deleteItemFromListSaturday, deleteItemFromListClasses, deleteItemFromActivityChildren} = ListDataInputsSlice.actions;

export default ListDataInputsSlice.reducer;