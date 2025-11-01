"use client";

import { addElementClicked } from "@/lib/features/elementClicked/elementClickedSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/lib/hooks";
import DialogDeleteText from "../dialog/DialogDeleteText";

interface SpacerElementProps {
  content: string;
  id: string;
}

const SpacerElement: React.FC<SpacerElementProps> = ({ content, id }) => {
  const dispatch = useDispatch();
  const elementClicked = useAppSelector((state) => state.elementClicked);
  const isSelected = elementClicked.id === id;

  // Estrae l'altezza dal content
  const extractHeight = (htmlContent: string): number => {
    const match = htmlContent.match(/height:\s*(\d+)px/);
    return match ? parseInt(match[1]) : 20;
  };

  const height = extractHeight(content);

  return (
    <div
      className={`w-full relative group cursor-pointer rounded-lg transition-all duration-200 border-2 border-dashed ${
        isSelected ? "bg-accent/50 ring-2 ring-primary/30 border-primary" : "bg-muted/20 hover:bg-accent/30 border-border"
      }`}
      style={{ minHeight: `${height}px` }}
      onClick={(e) => {
        e.stopPropagation();
        dispatch(addElementClicked({ id: id, type: "spacer" }));
      }}
    >
      <DialogDeleteText id={id} />
      <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
        Spazio: {height}px
      </div>
      <div
        className="w-full"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default SpacerElement;

