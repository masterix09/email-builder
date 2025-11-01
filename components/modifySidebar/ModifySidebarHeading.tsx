"use client";
import { useAppSelector } from "@/lib/hooks";
import React, { useMemo } from "react";
import { Input } from "../ui/input";
import { extractText } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { updateColumn } from "@/lib/features/columns/columnSlice";

const ModifySidebarHeading = () => {
  const elementClicked = useAppSelector((state) => state.elementClicked);
  const columns = useAppSelector((state) => state.column);
  const element = columns.map((column) =>
    column.children?.find((element) => element.id === elementClicked.id)
  );
  const dispatch = useDispatch();

  // Estrae informazioni dal content HTML
  const headingInfo = useMemo(() => {
    if (element?.[0]?.content) {
      const text = extractText(element[0].content);
      const tagMatch = element[0].content.match(/<(h[1-6])/);
      const fontSizeMatch = element[0].content.match(/font-size:\s*(\d+)px/);
      const fontColorMatch = element[0].content.match(/color:\s*([^;]+);/);
      
      return {
        text,
        tag: tagMatch ? tagMatch[1] : 'h2',
        fontSize: fontSizeMatch ? parseInt(fontSizeMatch[1]) : 24,
        fontColor: fontColorMatch ? fontColorMatch[1].trim() : '#000000',
      };
    }
    return {
      text: 'Intestazione',
      tag: 'h2',
      fontSize: 24,
      fontColor: '#000000',
    };
  }, [element]);

  const heading = headingInfo;

  // Funzione per aggiornare l'intestazione
  const updateHeading = (newHeading: typeof heading) => {
    const updatedHeading = { ...heading, ...newHeading };
    const columnSelected = columns.find((element) => element !== undefined);
    const newChildren = columnSelected?.children?.map((child) =>
      child.id === elementClicked.id
        ? {
            id: child.id,
            name: child.name,
            type: child.type,
            content: `<${updatedHeading.tag} style="font-size: ${updatedHeading.fontSize}px; font-weight: bold; margin: 0; color: ${updatedHeading.fontColor};">${updatedHeading.text}</${updatedHeading.tag}>`,
            icon: null,
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
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-lg font-semibold text-foreground">Proprietà Intestazione</h1>
          <p className="text-xs text-muted-foreground">Personalizza l&apos;intestazione</p>
        </div>

        {/* Text Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Testo</label>
          <Input
            type="text"
            value={heading.text}
            onChange={(e) => updateHeading({ ...heading, text: e.target.value })}
            key={elementClicked.id}
            placeholder="Testo intestazione"
          />
        </div>

        {/* Tag Select */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Livello</label>
          <select
            value={heading.tag}
            onChange={(e) => updateHeading({ ...heading, tag: e.target.value })}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
          >
            <option value="h1">H1 - Principale</option>
            <option value="h2">H2 - Secondario</option>
            <option value="h3">H3 - Terziario</option>
            <option value="h4">H4</option>
            <option value="h5">H5</option>
            <option value="h6">H6</option>
          </select>
        </div>

        {/* Font Size */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Dimensione</label>
            <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
              {heading.fontSize}px
            </span>
          </div>
          <input 
            className="w-full" 
            type="range" 
            min={12} 
            max={72} 
            value={heading.fontSize} 
            onChange={(e) => updateHeading({ ...heading, fontSize: parseInt(e.target.value) })}
          />
        </div>

        {/* Font Color */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Colore</label>
          <div className="flex items-center gap-3">
            <Input
              type="color"
              value={heading.fontColor}
              onChange={(e) => updateHeading({ ...heading, fontColor: e.target.value })}
              className="h-12 w-20 cursor-pointer rounded-lg border-2 border-border"
            />
            <div className="flex-1">
              <Input
                type="text"
                value={heading.fontColor}
                onChange={(e) => updateHeading({ ...heading, fontColor: e.target.value })}
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

export default ModifySidebarHeading;

