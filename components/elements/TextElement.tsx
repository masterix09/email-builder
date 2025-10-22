"use client"

import { addElementClicked } from "@/lib/features/elementClicked/elementClickedSlice";
import { extractText } from "@/lib/utils";
import { useDispatch } from "react-redux";

interface TextElementProps {
  content: string;
  id: string;
}

const TextElement: React.FC<TextElementProps> = ({ content, id }) => {
  const dispatch = useDispatch();
    
  const text = extractText(content);
  console.log("text", text);

  return (
    <div className="w-full h-full flex items-center justify-center p-2" onClick={() => dispatch(addElementClicked({id: id, type: "text"}))}>
      <p className="text-center text-gray-700" dangerouslySetInnerHTML={{ __html: content }}></p>
    </div>
  );
};

export default TextElement;
