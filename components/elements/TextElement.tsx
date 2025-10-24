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

  return (
    <div
      className="w-full h-full flex items-center justify-center p-2 relative"
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
            className={`absolute -top-5 right-0 ${elementClicked.id === id ? "flex" : "hidden"} z-10 items-center justify-center`}
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
            <Button variant="destructive" onClick={() => dispatch(deleteElement({idElement: id, columnId: element?.id ?? ""}))}>Elimina</Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Annulla
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <p
        className="text-center text-gray-700 w-full"
        dangerouslySetInnerHTML={{ __html: content }}
      ></p>
    </div>
  );
};

export default TextElement;
