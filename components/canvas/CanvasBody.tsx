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
import { Layers2 } from "lucide-react";

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
    <div className="col-span-4 overflow-y-auto h-full bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Canvas Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-foreground">Canvas</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {columns.length === 0 
                ? "Trascina gli elementi qui per costruire la tua email"
                : `${columns.length} ${columns.length === 1 ? 'colonna' : 'colonne'}`}
            </p>
          </div>
          {columns.length > 0 && (
            <div className="text-xs font-medium text-foreground bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/20">
              {columns.length} {columns.length === 1 ? 'colonna' : 'colonne'}
            </div>
          )}
        </div>

        {/* Canvas Area */}
        <div
          className="w-full min-h-[600px] bg-white dark:bg-slate-950 p-8 rounded-xl shadow-xl border border-border flex flex-col gap-4 overflow-y-auto transition-all"
          onDragOver={(ev) => {
            ev.preventDefault();
          }}
          onDrop={onDropCanvasFunction}
        >
          {columns.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-3 py-12">
                <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <Layers2 className="size-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Nessuna colonna ancora</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Trascina una colonna dalla sidebar per iniziare
                  </p>
                </div>
              </div>
            </div>
          ) : (
            columns.map((column) => (
              <ColumnRender 
                key={column.id}
                column={column}
                draggedOverColumn={draggedOverColumn}
                onDragEnterColumnFunction={onDragEnterColumnFunction}
                onDragLeaveColumnFunction={onDragLeaveColumnFunction}
                onDropColumnFunction={onDropColumnFunction}
                setDraggedOverColumn={setDraggedOverColumn}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CanvasBody;
