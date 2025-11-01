import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { ColumnElementWithoutIcon } from "@/lib/features/columns/columnSlice";
import { useDispatch } from "react-redux";
import { handleClearAll } from "@/lib/header";
import { Trash2 } from "lucide-react";
const ButtonDeleteAll = ({
  columns,
}: {
  columns: ColumnElementWithoutIcon[];
}) => {
  const [showClearDialog, setShowClearDialog] = useState<boolean>(false);
  const dispatch = useDispatch();
  const ClearAll = () => {
    handleClearAll(columns, dispatch);
    setShowClearDialog(false);
  }
  return (
    <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={columns.length === 0}
          className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="size-4" />
          Pulisci
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pulisci tutto</DialogTitle>
          <DialogDescription>
            Sei sicuro di voler eliminare tutte le colonne? Questa azione non
            può essere annullata.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Annulla
            </Button>
          </DialogClose>
          <Button variant="destructive" onClick={ClearAll}>
            Pulisci tutto
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ButtonDeleteAll;
