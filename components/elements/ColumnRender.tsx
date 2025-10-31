"use client";
import React from "react";
import { useDispatch } from "react-redux";
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
import { useAppSelector } from "@/lib/hooks";
import {
  ColumnElementWithoutIcon,
  deleteColumn,
} from "@/lib/features/counter/columnSlice";
import { addElementClicked } from "@/lib/features/elementClicked/elementClickedSlice";
import { extractBackgroundColor } from "@/lib/utils";
import ElementRenderer from "./ElementRenderer";

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
  const columns = useAppSelector((state) => state.column);
  const columnElement = columns.find((column) => column.id === column.id);
  const isSelected = elementClicked.id === column.id;
  const isDraggedOver = draggedOverColumn === column.id;
  const bgColor = extractBackgroundColor(columnElement?.content || "") || "#ffffff";

  return (
    <div
      id={column.id}
      key={column.id}
      data-column-id={column.id}
      style={{ backgroundColor: bgColor }}
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
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="icon-sm"
            variant="destructive"
            className={`absolute -top-3 -right-3 ${
              isSelected ? "flex" : "hidden"
            } z-10 items-center justify-center shadow-lg hover:scale-110 transition-transform`}
          >
            <X className="size-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Elimina colonna</DialogTitle>
            <DialogDescription>
              Questa azione non può essere annullata. Questo eliminerà
              permanentemente questa colonna e tutti i suoi elementi dall&apos;area di
              lavoro.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Annulla
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={() => dispatch(deleteColumn(column.id))}
            >
              Elimina
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
