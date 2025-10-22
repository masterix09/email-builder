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
      
      return {
        text,
        bold,
        italic,
        underline,
        textAlign
      };
    }
    return {
      text: "Testo",
      bold: false,
      italic: false,
      underline: false,
      textAlign: "start",
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
            content: `<p style="text-align: ${updatedText.textAlign};">${updatedText.bold ? "<strong>" : ""}${
              updatedText.italic ? "<em>" : ""
            }${updatedText.underline ? "<u>" : ""}${updatedText.text}${
              updatedText.bold ? "</strong>" : ""
            }${updatedText.italic ? "</em>" : ""}${updatedText.underline ? "</u>" : ""}</p>`,
            icon: null,
            textAlign: updatedText.textAlign,
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
      </div>
    </div>
  );
};

export default ModifySidebarText;
