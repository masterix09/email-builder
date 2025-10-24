"use client";
import { useAppSelector } from "@/lib/hooks";
import React, { useMemo } from "react";
import { Input } from "../ui/input";
import { extractText } from "@/lib/utils";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { updateColumn } from "@/lib/features/counter/columnSlice";
import { BoldIcon, ItalicIcon, TextAlignCenter, TextAlignEnd, TextAlignStart, UnderlineIcon } from "lucide-react";

interface ITextFormat {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  text: string;
  textAlign: string;  
  fontSize: number;
  fontColor: string;
}

const ModifySidebarText = () => {
  const elementClicked = useAppSelector((state) => state.elementClicked);
  const columns = useAppSelector((state) => state.column);
  const element = columns.map((column) =>
    column.children?.find((element) => element.id === elementClicked.id)
  );
  const dispatch = useDispatch();

  // Calcola il testo iniziale basandosi sull'elemento selezionato
  const initialText = useMemo(() => {
    if (element?.[0]?.content) {
      const text = extractText(element[0].content);
      const bold = element[0].content.includes('<strong>');
      const italic = element[0].content.includes('<em>');
      const underline = element[0].content.includes('<u>');
      const alignMatch = element[0].content.match(/<p[^>]*style="[^"]*text-align:\s*([^;]+);/);
      const textAlign = alignMatch ? alignMatch[1].trim() : "start";
      const fontSizeMatch = element[0].content.match(/<p[^>]*style="[^"]*font-size:\s*(\d+)px;/);
      const fontSize = fontSizeMatch ? parseInt(fontSizeMatch[1]) : 16;
      const fontColorMatch = element[0].content.match(/<p[^>]*style="[^"]*color:\s*([^;]+);/);
      const fontColor = fontColorMatch ? fontColorMatch[1].trim() : "#000000";
      return {
        text,
        bold,
        italic,
        underline,
        textAlign,
        fontSize,
        fontColor
      };
    }
    return {
      text: "Testo",
      bold: false,
      italic: false,
      underline: false,
      textAlign: "start",
      fontSize: 16,
      fontColor: "#000000"
    };
  }, [element]);

  // Usa direttamente initialText invece di stato locale
  const text = initialText;

  // Funzione per aggiornare il testo
  const updateText = (newText: ITextFormat) => {
    const updatedText = { ...text, ...newText };
    const columnSelected = columns.find((element) => element !== undefined);
    const newChildren = columnSelected?.children?.map((child) =>
      child.id === elementClicked.id
        ? {
            id: child.id,
            name: child.name,
            type: child.type,
            content: `<p style="text-align: ${updatedText.textAlign}; font-size: ${updatedText.fontSize}px; color: ${updatedText.fontColor};">${updatedText.bold ? "<strong>" : ""}${
              updatedText.italic ? "<em>" : ""
            }${updatedText.underline ? "<u>" : ""}${updatedText.text}${
              updatedText.bold ? "</strong>" : ""
            }${updatedText.italic ? "</em>" : ""}${updatedText.underline ? "</u>" : ""}</p>`,
            icon: null,
            textAlign: updatedText.textAlign,
            fontSize: updatedText.fontSize
          }
        : child
    );
    
    dispatch(
      updateColumn({
        id: columnSelected?.id || "",
        name: columnSelected?.name || "",
        type: columnSelected?.type || "",
        content: columnSelected?.content || "",
        icon: null,
        children: newChildren || [],
      })
    );
  };

  return (
    <div className="p-3">
      <style jsx>{`
        .range-input::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #000000;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .range-input::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #000000;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .range-input::-webkit-slider-track {
          background: transparent;
          height: 6px;
          border-radius: 3px;
        }
        .range-input::-moz-range-track {
          background: transparent;
          height: 6px;
          border-radius: 3px;
          border: none;
        }
      `}</style>
      <h1 className="text-lg font-bold">Modifica elemento</h1>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-bold">Testo</h2>
          <Input
            type="text"
            value={text.text}
            onChange={(e) => updateText({ ...text, text: e.target.value })}
            key={elementClicked.id} // Forza il re-render quando cambia l'elemento
          />
        </div>
        <h2 className="text-sm font-bold mt-3">Font Style</h2>
        <div className="flex justify-between items-center gap-2 flex-1">
          <Button
            variant={text.bold ? "default" : "outline"}
            onClick={() => updateText({ ...text, bold: !text.bold })}
          >
            <BoldIcon />
          </Button>
          <Button
            variant={text.underline ? "default" : "outline"}
            onClick={() => updateText({ ...text, underline: !text.underline })}
          >
            <UnderlineIcon />
          </Button>
          <Button
            variant={text.italic ? "default" : "outline"}
            onClick={() => updateText({ ...text, italic: !text.italic })}
          >
            <ItalicIcon />
          </Button>
        </div>
        <h2 className="text-sm font-bold mt-3">Text Align</h2>
        <div className="flex justify-between items-center flex-1">
          <Button
            variant={text.textAlign === "start" ? "default" : "outline"}
            onClick={() => updateText({ ...text, textAlign: "start" })}
          >
            <TextAlignStart />
          </Button>
          <Button
            variant={text.textAlign === "center" ? "default" : "outline"}
            onClick={() => updateText({ ...text, textAlign: "center" })}
          >
            <TextAlignCenter />
          </Button>
          <Button
            variant={text.textAlign === "end" ? "default" : "outline"}
            onClick={() => updateText({ ...text, textAlign: "end" })}
          >
            <TextAlignEnd />
          </Button>
        </div>
        <h2 className="text-sm font-bold mt-3">Font Size</h2>
        <input 
          className="w-full range-input" 
          type="range" 
          min={12} 
          max={100} 
          value={text.fontSize} 
          onChange={(e) => {
            const percentage = ((parseInt(e.target.value) - 12) / (100 - 12)) * 100;
            e.target.style.background = `linear-gradient(to right, #000000 0%, #000000 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`;
            updateText({ ...text, fontSize: parseInt(e.target.value) });
          }}
          style={{
            background: `linear-gradient(to right, #000000 0%, #000000 ${((text.fontSize - 12) / (100 - 12)) * 100}%, #e5e7eb ${((text.fontSize - 12) / (100 - 12)) * 100}%, #e5e7eb 100%)`,
            appearance: 'none',
            height: '6px',
            borderRadius: '3px',
            outline: 'none'
          }}
        />
        <h2 className="text-sm font-bold mt-3">Font Color</h2>
        <Input type="color" value={text.fontColor} onChange={(e) => updateText({ ...text, fontColor: e.target.value })} />
      </div>
    </div>
  );
};

export default ModifySidebarText;
