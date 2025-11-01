"use client";

import React from 'react';
import { addElementClicked } from "@/lib/features/elementClicked/elementClickedSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/lib/hooks";
import DialogDeleteText from "../dialog/DialogDeleteText";

interface ImageElementProps {
  content: string;
  id: string;
}

const ImageElement: React.FC<ImageElementProps> = ({ content, id }) => {
  const dispatch = useDispatch();
  const elementClicked = useAppSelector((state) => state.elementClicked);
  const isSelected = elementClicked.id === id;

  // Estrae l'URL dell'immagine dal content HTML
  const extractImageSrc = (htmlContent: string): string => {
    const match = htmlContent.match(/src="([^"]*)"/);
    return match ? match[1] : 'https://via.placeholder.com/150';
  };

  const imageSrc = extractImageSrc(content);

  return (
    <div
      className={`w-full h-full flex items-center justify-center p-4 bg-muted/30 rounded-lg relative group cursor-pointer transition-all duration-200 ${
        isSelected ? "bg-accent/50 ring-2 ring-primary/30" : "hover:bg-accent/30"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        dispatch(addElementClicked({ id: id, type: "image" }));
      }}
    >
      <DialogDeleteText id={id} />
      <img 
        src={imageSrc} 
        alt="Elemento immagine" 
        className="max-w-full max-h-full object-contain rounded-md shadow-sm"
        style={{ maxHeight: '200px' }}
      />
    </div>
  );
};

export default ImageElement;
