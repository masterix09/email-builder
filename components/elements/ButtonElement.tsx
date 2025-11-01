"use client";

import { addElementClicked } from "@/lib/features/elementClicked/elementClickedSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/lib/hooks";
import DialogDeleteText from "../dialog/DialogDeleteText";

interface ButtonElementProps {
  content: string;
  id: string;
}

const ButtonElement: React.FC<ButtonElementProps> = ({ content, id }) => {
  const dispatch = useDispatch();
  const elementClicked = useAppSelector((state) => state.elementClicked);
  const isSelected = elementClicked.id === id;

  // Estrae il testo e gli attributi del bottone dal content HTML
  const extractButtonInfo = (htmlContent: string) => {
    const textMatch = htmlContent.match(/>([^<]+)</);
    const hrefMatch = htmlContent.match(/href="([^"]*)"/);
    const styleMatch = htmlContent.match(/style="([^"]*)"/);
    
    return {
      text: textMatch ? textMatch[1] : 'Clicca qui',
      href: hrefMatch ? hrefMatch[1] : '#',
      style: styleMatch ? styleMatch[1] : ''
    };
  };

  const { text, href, style } = extractButtonInfo(content);

  return (
    <div
      className={`w-full h-full flex items-center justify-center p-4 relative group cursor-pointer rounded-lg transition-all duration-200 ${
        isSelected ? "bg-accent/50 ring-2 ring-primary/30" : "hover:bg-accent/30"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        dispatch(addElementClicked({ id: id, type: "button" }));
        window.location.href = href;
      }}
    >
      <DialogDeleteText id={id} />
      <div
        className="w-full flex items-center justify-center"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default ButtonElement;

