'use client';
import { ScheduleItem, ScheduleState } from "@/components/type/dateInput";
import { RootState } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// interface ScheduleItem {
//     id: number;
//     name: string;
//     time: string;
//     nameLecture?: string; 
// }


// interface ScheduleState {
//     shabbatNight: ScheduleItem[];
//     saturday: ScheduleItem[];
//     classes: ScheduleItem[];
//     activityChildren: ScheduleItem[];
// }

export const initialState: ScheduleState = {
    shabbatNight: [
        { id: 1, name: "מנחה", time: "" },
        { id: 2, name: "קבלת שבת", time: "" }
    ],
    saturday: [
        { id: 1, name: "שחרית", time: "" },
        { id: 2, name: "מנחה", time: "" },
        { id: 3, name: "ערבית", time: "" }
    ],
    classes: [
        { id: 1, name: "שיחה חסידית", time: "", nameLecture: "" },
        { id: 2, name: "חסידות בוקר", time: "", nameLecture: "" },
        { id: 3, name: "שיעור בהלכה", time: "", nameLecture: "" }
    ],
    activityChildren: []
};


interface ScheduleActionPayload {
    keyData: keyof ScheduleState; 
    newList: ScheduleItem[];
    value: string;
    id: number;
    name: string;
    typeAction: "add" | "update" | "delete"; 
}

export const ScheduleSlice = createSlice({
    name: 'scheduleSlice',
    initialState,
    reducers: {
        actionObjSchedule(state, action: PayloadAction<ScheduleActionPayload>) {
            const { keyData, newList, value, id, name, typeAction } = action.payload;
            const updatedList = actionList(state[keyData], newList, value, id, name, typeAction);
            state[keyData] = updatedList;
        },
    }
});


const addItemToList = (list: ScheduleItem[], name: string, value: string): ScheduleItem[] => {
    const existingIndex = list.findIndex(item => item.name === name);
    if (existingIndex !== -1) {
        list[existingIndex].time = value;
    } else {
        list.push({ id: list.length + 1, name: name, time: value });
    }
    return list;
};


const deleteOneInput = (list: ScheduleItem[], id: number): ScheduleItem[] => {
    const index = list.findIndex(item => item.id === id);
    if (index !== -1) {
        list.splice(index, 1);
    }
    return list;
};

const updateList = (list: ScheduleItem[], newList: ScheduleItem[]): ScheduleItem[] => {
    return newList;
};


const actionList = (objSchedule: ScheduleItem[], newList: ScheduleItem[], value: string, id: number, name: string, typeAction: string): ScheduleItem[] => {
    switch (typeAction) {
        case "add":
            return addItemToList(objSchedule, name, value);
        case "update":
            return updateList(objSchedule, newList);
        case "delete":
            return deleteOneInput(objSchedule, id);
        default:
            return objSchedule;
    }
};

export const { actionObjSchedule } = ScheduleSlice.actions;
export default ScheduleSlice.reducer;
