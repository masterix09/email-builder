"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/lib/hooks";
import {ColumnElementWithoutIcon} from "@/lib/features/counter/columnSlice";
import { addElementClicked } from "@/lib/features/elementClicked/elementClickedSlice";
import { extractBackgroundColor } from "@/lib/utils";
import ElementRenderer from "./ElementRenderer";
import DialogDeleteColumn from "../dialog/DialogDeleteColumn";

type ColumnRenderProps = {
  column: ColumnElementWithoutIcon;
  draggedOverColumn: string | null;
  onDragEnterColumnFunction: (
    ev: React.DragEvent<HTMLDivElement>,
    columnId: string
  ) => void;
  onDragLeaveColumnFunction: (ev: React.DragEvent<HTMLDivElement>) => void;
  onDropColumnFunction: (
    ev: React.DragEvent<HTMLDivElement>,
    column: ColumnElementWithoutIcon
  ) => void;
  setDraggedOverColumn: React.Dispatch<React.SetStateAction<string | null>>;
};

const ColumnRender = ({
  column,
  draggedOverColumn,
  onDragEnterColumnFunction,
  onDragLeaveColumnFunction,
  onDropColumnFunction,
  setDraggedOverColumn,
}: ColumnRenderProps) => {
  const dispatch = useDispatch();
  const elementClicked = useAppSelector((state) => state.elementClicked);
  const isSelected = elementClicked.id === column.id;
  const isDraggedOver = draggedOverColumn === column.id;

  return (
    <div
      id={column.id}
      key={column.id}
      data-column-id={column.id}
      style={{ backgroundColor: extractBackgroundColor(column.content) || "#ffffff"}}
      className={`${column.content} w-full p-4 h-fit rounded-lg border-2 transition-all duration-200 relative group ${
        isSelected 
          ? "border-primary shadow-lg ring-2 ring-primary/20" 
          : "border-border hover:border-primary/50"
      } ${
        isDraggedOver ? "ring-2 ring-primary/40 border-primary shadow-lg" : ""
      }`}
      onClick={() =>
        dispatch(addElementClicked({ id: column.id, type: "column" }))
      }
      onDragEnter={(ev) => {
        onDragEnterColumnFunction(ev, column.id);
      }}
      onDragLeave={(ev) => {
        onDragLeaveColumnFunction(ev);
      }}
      onDragOver={(ev) => {
        ev.preventDefault();
      }}
      onDrop={(ev) => {
        onDropColumnFunction(ev, column);
      }}
    >
      <DialogDeleteColumn id={column.id} />
      {column.children?.map((child) => (
        <div
          id={child.id}
          key={child.id}
          className="w-full p-2 h-fit relative"
          onDragEnter={(ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            setDraggedOverColumn(column.id);
          }}
          onDragLeave={(ev) => {
            ev.preventDefault();
            ev.stopPropagation();
          }}
          onDragOver={(ev) => {
            ev.preventDefault();
            ev.stopPropagation();
          }}
        >
          <ElementRenderer element={child} />
        </div>
      ))}
    </div>
  );
};

export default ColumnRender;
