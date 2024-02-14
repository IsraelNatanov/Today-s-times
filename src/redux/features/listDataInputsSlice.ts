'use client';
import { DataInput } from "@/components/type/dateInput";
import { RootState } from "../store";
import { createSelector, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";


export interface ListDataInput {
  listShabbatNight: DataInput[];
  listSaturday: DataInput[];
  listClasses: DataInput[];
  listActivityChildren: DataInput[];

}


export const initialState: ListDataInput = {
  listShabbatNight: [{id:1, name: "מנחה", time: "" }, {id:2, name: "קבלת שבת", time: "" }],
  listSaturday: [{id:1, name: "שחרית", time: "" }, {id:2, name: "מנחה", time: "" }, {id:3, name: "ערבית", time: "" }],
  listClasses: [{id:1, name: "שיחה חסידית", time: "", nameLecture: "" }, {id:2, name: "חסידות בוקר", time: "", nameLecture: "" }, {id:3, name: "שיעור בהלכה", time: "", nameLecture: "" }],
  listActivityChildren: []

};
export const ListDataInputsSlice = createSlice({
  name: 'listDataInput',
  initialState,
  reducers: {
  
    addToListShabbatNight(state, action: PayloadAction<DataInput>) {
      const dataOf: DataInput = action.payload
      const list = updateList(state.listShabbatNight, dataOf.name, dataOf.time)
      state.listShabbatNight = list

    },
    addToListSaturday(state, action: PayloadAction<DataInput>) {
      const dataOf: DataInput = action.payload
      const list = updateList(state.listSaturday, dataOf.name, dataOf.time)
      state.listSaturday = list
    },
    addToListClasses(state, action: PayloadAction<DataInput>) {
      const dataOf: DataInput = action.payload
      const list = updateList(state.listClasses, dataOf.name, dataOf.time)
      state.listClasses = list
    },
    addToListActivityChildren(state, action: PayloadAction<DataInput>) {
      const dataOf: DataInput = action.payload
      const list = updateList(state.listActivityChildren, dataOf.name, dataOf.time)
      state.listActivityChildren = list
    },
    updateListShabbatNight(state, action: PayloadAction<DataInput[]>) {
      state.listShabbatNight = action.payload
    },
    updateListSaturday(state, action: PayloadAction<DataInput[]>) {
      state.listSaturday = action.payload
    },
    updateListClasses(state, action: PayloadAction<DataInput[]>) {
      state.listClasses = action.payload
    },
    updateListActivityChildren(state, action: PayloadAction<DataInput[]>) {
      state.listActivityChildren = action.payload
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

const updateList = (arr: DataInput[], name: string, value: string) => {
  const existingIndex = arr.findIndex(item => item.name === name);

  if (existingIndex !== -1) {
    arr[existingIndex].time = value
  }
  else {
    arr.push({id:arr.length+1, name: name, time: value })
  }
  return arr
}
const deleteOneInpute =(arr: DataInput[],id:number)=>{
 
    arr.splice(id, 1);
    return arr
  
}

export const { addToListShabbatNight, addToListSaturday, addToListClasses, addToListActivityChildren, updateListShabbatNight, updateListSaturday, updateListClasses, updateListActivityChildren, deleteItemFromShabbatNight, deleteItemFromListSaturday, deleteItemFromListClasses, deleteItemFromActivityChildren} = ListDataInputsSlice.actions;

export default ListDataInputsSlice.reducer;