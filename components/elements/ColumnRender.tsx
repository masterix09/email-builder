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
  const bg = extractBackgroundColor(columnElement?.content || "");
  return (
    <div
      id={column.id}
      key={column.id}
      data-column-id={column.id}
      style={{ backgroundColor: bg }}
      className={`${
        column.content
      } w-full p-3 h-fit transition-colors duration-200 relative ${
        draggedOverColumn === column.id ? "bg-green-300!" : ""
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
              permanentemente questo elemento e lo rimuoverà dall&apos;area di
              lavoro.
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
  );
};

export default ColumnRender;
