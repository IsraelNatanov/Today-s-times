import React, { useState } from "react";
import { DataInput } from "../type/dateInput";
import { TrashIcon } from "@/images/trashIcon";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./sortableItem";

import { horizontalListSortingStrategy } from "@dnd-kit/sortable";



interface IProps {
  jsonInputs: DataInput[];
  handleList: (
    typeAction: "add" | "update" | "delete",
    newList?: DataInput[],
    value?: string,
    id?: number,
    name?: string
  ) => void;
}

 export const InputTime = ({ jsonInputs, handleList }: IProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = jsonInputs.findIndex((item) => item.id === active.id);
      const newIndex = jsonInputs.findIndex((item) => item.id === over.id);
      const newItems = arrayMove(jsonInputs, oldIndex, newIndex);

          

      handleList("update", newItems); // Update the list 
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={jsonInputs} strategy={horizontalListSortingStrategy}>
        <div className="row-input flex flex-row">
          {jsonInputs.map((item) => (
            <SortableItem key={item.id} item={item} handleList={handleList} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
