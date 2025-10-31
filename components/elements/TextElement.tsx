"use client";

import { addElementClicked } from "@/lib/features/elementClicked/elementClickedSlice";
import { extractText } from "@/lib/utils";
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
interface TextElementProps {
  content: string;
  id: string;
}

const TextElement: React.FC<TextElementProps> = ({ content, id }) => {
  const dispatch = useDispatch();
  const columns = useAppSelector((state) => state.column);
  const element = columns.find((column) =>
    column.children?.find((element) => element.id === id)
  );
  const elementClicked = useAppSelector((state) => state.elementClicked);
  const text = extractText(content);
  console.log("text", text);

  const isSelected = elementClicked.id === id;

  return (
    <div
      className={`w-full h-full flex items-center justify-center p-4 relative group cursor-pointer rounded-lg transition-all duration-200 ${
        isSelected ? "bg-accent/50 ring-2 ring-primary/30" : "hover:bg-accent/30"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        dispatch(addElementClicked({ id: id, type: "text" }));
      }}
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="icon-sm"
            variant="destructive"
            className={`absolute -top-2 -right-2 ${isSelected ? "flex" : "hidden group-hover:flex"} z-10 items-center justify-center shadow-lg hover:scale-110 transition-transform`}
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
      <div
        className="w-full text-foreground"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
};

export default TextElement;
