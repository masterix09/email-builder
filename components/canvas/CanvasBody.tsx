"use client";
import {
  ColumnElementWithoutIcon,
  addColumn,
  deleteColumn,
  selectColumns,
  updateColumn,
} from "@/lib/features/counter/columnSlice";
import { useAppSelector } from "@/lib/hooks";
import { ColumnElement } from "@/lib/type";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ElementRenderer from "../elements/ElementRenderer";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addElementClicked } from "@/lib/features/elementClicked/elementClickedSlice";

const CanvasBody = () => {
  const dispatch = useDispatch();
  const columns = useAppSelector(selectColumns);
  const [draggedOverColumn, setDraggedOverColumn] = useState<string | null>(
    null
  );
  const [dragTimeout, setDragTimeout] = useState<NodeJS.Timeout | null>(null);
  const elementClicked = useAppSelector((state) => state.elementClicked);
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
          <div
            id={column.id}
            key={column.id}
            data-column-id={column.id}
            className={`${
              column.content
            } w-full p-3 h-fit transition-colors duration-200 relative ${
              draggedOverColumn === column.id ? "bg-green-300" : ""
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
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="icon-sm"
                  variant="destructive"
                  className={`absolute -top-5 right-0 ${
                    elementClicked.id === column.id ? "flex" : "hidden"
                  } z-10 items-center justify-center`}
                >
                  <X className="text-white" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sei davvero sicuro?</DialogTitle>
                  <DialogDescription>
                    Questa azione non può essere annullata. Questo eliminerà
                    permanentemente questo elemento e lo rimuoverà
                    dall&apos;area di lavoro.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="destructive"
                    onClick={() => dispatch(deleteColumn(column.id))}
                  >
                    Elimina
                  </Button>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Annulla
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {column.children?.map((child) => (
              <div
                id={child.id}
                key={child.id}
                className="w-full p-3 h-fit relative"
                onDragEnter={(ev) => {
                  ev.preventDefault();
                  ev.stopPropagation();
                  // Mantieni la colonna come dragged over
                  setDraggedOverColumn(column.id);
                }}
                onDragLeave={(ev) => {
                  ev.preventDefault();
                  ev.stopPropagation();
                  // Non fare nulla, lascia che la colonna gestisca il drag leave
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
        ))}
      </div>
    </div>
  );
};

export default CanvasBody;
