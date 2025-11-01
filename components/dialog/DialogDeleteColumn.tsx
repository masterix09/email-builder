import React from 'react'
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
  import { Button } from "../ui/button";
  import { X } from "lucide-react";
  import { useDispatch } from "react-redux";
  import { useAppSelector } from "@/lib/hooks";
import { deleteColumn } from '@/lib/features/columns/columnSlice';

const DialogDeleteColumn = ({ id }: { id: string }) => {
    const dispatch = useDispatch();
  const elementClicked = useAppSelector((state) => state.elementClicked);
  const isSelected = elementClicked.id === id;
  return (
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
          onClick={() => dispatch(deleteColumn(id))}
        >
          Elimina
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default DialogDeleteColumn