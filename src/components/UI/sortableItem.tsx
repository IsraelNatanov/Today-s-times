import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DataInput } from "../type/dateInput";
import { TrashIcon } from "@/images/trashIcon";

interface SortableItemProps {
  item: DataInput;
  handleList: (
    typeAction: "add" | "update" | "delete",
    newList?: DataInput[],
    value?: string,
    id?: number,
    name?: string
  ) => void;
}

export const SortableItem = ({ item, handleList }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex flex-col items-center justify-center bg-slate-100 min-w-[140px] min-h-[85px] rounded-lg drop-shadow-md"
    >
      <div className="has-tooltip">
        <span className="tooltip rounded shadow-lg p-1 text-xs bg-gray-100 top-[-10px] right-24">
          מחק
        </span>
        <div
          className="absolute top-1 left-0"
          onClick={() => handleList("delete", undefined, undefined, item.id, "")}
        >
          <TrashIcon color="#f9b630c5" />
        </div>
      </div>
      <label className="name-input">{item.name}</label>
      <input
        className="input-time"
        type="time"
        defaultValue={item.time}
        onChange={(e) =>
          handleList("add", undefined, e.target.value, item.id, item.name)
        }
      />
    </div>
  );
};
