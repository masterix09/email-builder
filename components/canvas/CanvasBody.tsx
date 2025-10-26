"use client";
import {
  ColumnElementWithoutIcon,
  addColumn,
  selectColumns,
  updateColumn,
} from "@/lib/features/counter/columnSlice";
import { useAppSelector } from "@/lib/hooks";
import { ColumnElement } from "@/lib/type";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ColumnRender from "../elements/ColumnRender";

const CanvasBody = () => {
  const dispatch = useDispatch();
  const columns = useAppSelector(selectColumns);
  const [draggedOverColumn, setDraggedOverColumn] = useState<string | null>(
    null
  );
  const [dragTimeout, setDragTimeout] = useState<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dragTimeout) {
        clearTimeout(dragTimeout);
      }
    };
  }, [dragTimeout]);

  const onDropCanvasFunction = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    const type = ev.dataTransfer.getData("type");
    if (type === "column") {
      const id = ev.dataTransfer.getData("id");
      const name = ev.dataTransfer.getData("name");
      const content = ev.dataTransfer.getData("content");
      dispatch(
        addColumn({
          id: id,
          name: name,
          type: type,
          content: content,
          icon: null,
          children: [],
        })
      );
    }
  };

  const onDragEnterColumnFunction = (
    ev: React.DragEvent<HTMLDivElement>,
    columnId: string
  ) => {
    ev.preventDefault();
    ev.stopPropagation();
    // Cancella qualsiasi timeout precedente
    if (dragTimeout) {
      clearTimeout(dragTimeout);
      setDragTimeout(null);
    }
    setDraggedOverColumn(columnId);
  };

  const onDragLeaveColumnFunction = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
    // Usa un timeout per gestire meglio le transizioni tra colonne
    const timeout = setTimeout(() => {
      setDraggedOverColumn(null);
    }, 50);
    setDragTimeout(timeout);
  };

  const onDropColumnFunction = (
    ev: React.DragEvent<HTMLDivElement>,
    column: ColumnElementWithoutIcon
  ) => {
    ev.preventDefault();
    setDraggedOverColumn(null);
    const id = ev.dataTransfer.getData("idEl");
    const name = ev.dataTransfer.getData("nameEl");
    const type = ev.dataTransfer.getData("typeEl");
    const content = ev.dataTransfer.getData("contentEl");
    dispatch(
      updateColumn({
        id: column.id,
        name: column.name,
        type: column.type,
        content: column.content,
        icon: null,
        children: [
          ...(column.children || []),
          {
            id,
            name,
            type,
            content,
            icon: null,
          } as unknown as ColumnElement,
        ],
      })
    );
  };
  
  return (
    <div className="col-span-4 overflow-y-auto h-screen p-4 bg-gray-300">
      <div
        className="w-full h-full bg-white p-3 rounded-sm shadow-md flex flex-col gap-2 overflow-y-auto"
        onDragOver={(ev) => {
          ev.preventDefault();
        }}
        onDrop={onDropCanvasFunction}
      >
        {columns.map((column) => (
          <ColumnRender 
            key={column.id}
            column={column}
            draggedOverColumn={draggedOverColumn}
            onDragEnterColumnFunction={onDragEnterColumnFunction}
            onDragLeaveColumnFunction={onDragLeaveColumnFunction}
            onDropColumnFunction={onDropColumnFunction}
            setDraggedOverColumn={setDraggedOverColumn}
          />
        ))}
      </div>
    </div>
  );
};

export default CanvasBody;
