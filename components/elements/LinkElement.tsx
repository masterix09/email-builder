"use client";

import { addElementClicked } from "@/lib/features/elementClicked/elementClickedSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/lib/hooks";
import DialogDeleteText from "../dialog/DialogDeleteText";

interface LinkElementProps {
  content: string;
  id: string;
}

const LinkElement: React.FC<LinkElementProps> = ({ content, id }) => {
  const dispatch = useDispatch();
  const elementClicked = useAppSelector((state) => state.elementClicked);
  const isSelected = elementClicked.id === id;

  return (
    <div
      className={`w-full h-full flex items-center justify-center p-4 relative group cursor-pointer rounded-lg transition-all duration-200 ${
        isSelected ? "bg-accent/50 ring-2 ring-primary/30" : "hover:bg-accent/30"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        dispatch(addElementClicked({ id: id, type: "link" }));
      }}
    >
      <DialogDeleteText id={id} />
      <div
        className="w-full text-foreground"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default LinkElement;

