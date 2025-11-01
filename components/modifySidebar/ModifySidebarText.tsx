"use client";
import { useAppSelector } from "@/lib/hooks";
import React, { useMemo } from "react";
import { Input } from "../ui/input";
import { extractText } from "@/lib/utils";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { updateColumn } from "@/lib/features/columns/columnSlice";
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
    <div className="w-full h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        <style jsx>{`
          .range-input::-webkit-slider-thumb {
            appearance: none;
            height: 18px;
            width: 18px;
            border-radius: 50%;
            background: hsl(var(--primary));
            cursor: pointer;
            border: 2px solid hsl(var(--background));
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
            transition: all 0.2s;
          }
          .range-input::-webkit-slider-thumb:hover {
            transform: scale(1.1);
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
          }
          .range-input::-moz-range-thumb {
            height: 18px;
            width: 18px;
            border-radius: 50%;
            background: hsl(var(--primary));
            cursor: pointer;
            border: 2px solid hsl(var(--background));
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
            transition: all 0.2s;
          }
          .range-input::-moz-range-thumb:hover {
            transform: scale(1.1);
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
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
        
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-lg font-semibold text-foreground">Proprietà Testo</h1>
          <p className="text-xs text-muted-foreground">Personalizza l&apos;aspetto del testo</p>
        </div>

        {/* Text Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Contenuto</label>
          <Input
            type="text"
            value={text.text}
            onChange={(e) => updateText({ ...text, text: e.target.value })}
            key={elementClicked.id}
            placeholder="Inserisci il testo"
          />
        </div>

        {/* Font Style */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Stile</label>
          <div className="flex gap-2">
            <Button
              variant={text.bold ? "default" : "outline"}
              size="sm"
              className="flex-1"
              onClick={() => updateText({ ...text, bold: !text.bold })}
            >
              <BoldIcon className="size-4" />
            </Button>
            <Button
              variant={text.italic ? "default" : "outline"}
              size="sm"
              className="flex-1"
              onClick={() => updateText({ ...text, italic: !text.italic })}
            >
              <ItalicIcon className="size-4" />
            </Button>
            <Button
              variant={text.underline ? "default" : "outline"}
              size="sm"
              className="flex-1"
              onClick={() => updateText({ ...text, underline: !text.underline })}
            >
              <UnderlineIcon className="size-4" />
            </Button>
          </div>
        </div>

        {/* Text Align */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Allineamento</label>
          <div className="flex gap-2">
            <Button
              variant={text.textAlign === "start" ? "default" : "outline"}
              size="sm"
              className="flex-1"
              onClick={() => updateText({ ...text, textAlign: "start" })}
            >
              <TextAlignStart className="size-4" />
            </Button>
            <Button
              variant={text.textAlign === "center" ? "default" : "outline"}
              size="sm"
              className="flex-1"
              onClick={() => updateText({ ...text, textAlign: "center" })}
            >
              <TextAlignCenter className="size-4" />
            </Button>
            <Button
              variant={text.textAlign === "end" ? "default" : "outline"}
              size="sm"
              className="flex-1"
              onClick={() => updateText({ ...text, textAlign: "end" })}
            >
              <TextAlignEnd className="size-4" />
            </Button>
          </div>
        </div>

        {/* Font Size */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Dimensione</label>
            <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
              {text.fontSize}px
            </span>
          </div>
          <input 
            className="w-full range-input" 
            type="range" 
            min={12} 
            max={100} 
            value={text.fontSize} 
            onChange={(e) => {
              const value = parseInt(e.target.value);
              const percentage = ((value - 12) / (100 - 12)) * 100;
              e.target.style.background = `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${percentage}%, hsl(var(--muted)) ${percentage}%, hsl(var(--muted)) 100%)`;
              updateText({ ...text, fontSize: value });
            }}
            style={{
              background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${((text.fontSize - 12) / (100 - 12)) * 100}%, hsl(var(--muted)) ${((text.fontSize - 12) / (100 - 12)) * 100}%, hsl(var(--muted)) 100%)`,
              appearance: 'none',
              height: '6px',
              borderRadius: '3px',
              outline: 'none'
            }}
          />
        </div>

        {/* Font Color */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Colore</label>
          <div className="flex items-center gap-3">
            <Input
              type="color"
              value={text.fontColor}
              onChange={(e) => updateText({ ...text, fontColor: e.target.value })}
              className="h-12 w-20 cursor-pointer rounded-lg border-2 border-border"
            />
            <div className="flex-1">
              <Input
                type="text"
                value={text.fontColor}
                onChange={(e) => updateText({ ...text, fontColor: e.target.value })}
                placeholder="#000000"
                className="font-mono text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifySidebarText;
