import React from 'react'
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
import { deleteElement } from "@/lib/features/counter/columnSlice";
import { useAppSelector } from "@/lib/hooks";

const DialogDeleteText = ({ id }: { id: string }) => {
  const dispatch = useDispatch();
  const columns = useAppSelector((state) => state.column);
  const element = columns.find((column) =>
    column.children?.find((element) => element.id === id)
  );
  const elementClicked = useAppSelector((state) => state.elementClicked);

  const isSelected = elementClicked.id === id;
  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button
            size="icon-sm"
            variant="destructive"
            className={`absolute -top-2 -right-2 ${isSelected ? "flex" : "hidden"} z-10 items-center justify-center shadow-lg hover:scale-110 transition-transform`}
          >
            <X className="size-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Elimina elemento</DialogTitle>
            <DialogDescription>
              Questa azione non può essere annullata. Questo eliminerà
              permanentemente questo elemento dall&apos;area di lavoro.
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
              onClick={() => dispatch(deleteElement({ idElement: id, columnId: element?.id ?? "" }))}
            >
              Elimina
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}

export default DialogDeleteText