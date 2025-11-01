"use client";
import { useAppSelector } from "@/lib/hooks";
import React, { useMemo } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { updateColumn } from "@/lib/features/columns/columnSlice";

const ModifySidebarButton = () => {
  const elementClicked = useAppSelector((state) => state.elementClicked);
  const columns = useAppSelector((state) => state.column);
  const element = columns.map((column) =>
    column.children?.find((element) => element.id === elementClicked.id)
  );
  const dispatch = useDispatch();

  // Estrae informazioni dal content HTML
  const buttonInfo = useMemo(() => {
    if (element?.[0]?.content) {
      const textMatch = element[0].content.match(/>([^<]+)</);
      const hrefMatch = element[0].content.match(/href="([^"]*)"/);
      const bgColorMatch = element[0].content.match(/background-color:\s*([^;]+);/);
      const textColorMatch = element[0].content.match(/color:\s*([^;]+);/);
      const paddingMatch = element[0].content.match(/padding:\s*([^;]+);/);
      const borderRadiusMatch = element[0].content.match(/border-radius:\s*(\d+)px/);
      
      return {
        text: textMatch ? textMatch[1] : 'Clicca qui',
        href: hrefMatch ? hrefMatch[1] : '#',
        bgColor: bgColorMatch ? bgColorMatch[1].trim() : '#007bff',
        textColor: textColorMatch ? textColorMatch[1].trim() : '#ffffff',
        padding: paddingMatch ? paddingMatch[1].trim() : '12px 24px',
        borderRadius: borderRadiusMatch ? parseInt(borderRadiusMatch[1]) : 4,
      };
    }
    return {
      text: 'Clicca qui',
      href: '#',
      bgColor: '#007bff',
      textColor: '#ffffff',
      padding: '12px 24px',
      borderRadius: 4,
    };
  }, [element]);

  const button = buttonInfo;

  // Funzione per aggiornare il bottone
  const updateButton = (newButton: typeof button) => {
    const updatedButton = { ...button, ...newButton };
    const columnSelected = columns.find((element) => element !== undefined);
    const newChildren = columnSelected?.children?.map((child) =>
      child.id === elementClicked.id
        ? {
            id: child.id,
            name: child.name,
            type: child.type,
            content: `<a href="${updatedButton.href}" style="display: inline-block; padding: ${updatedButton.padding}; background-color: ${updatedButton.bgColor}; color: ${updatedButton.textColor}; text-decoration: none; border-radius: ${updatedButton.borderRadius}px; font-weight: 500;">${updatedButton.text}</a>`,
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
          <h1 className="text-lg font-semibold text-foreground">Proprietà Bottone</h1>
          <p className="text-xs text-muted-foreground">Personalizza l&apos;aspetto del bottone</p>
        </div>

        {/* Text Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Testo</label>
          <Input
            type="text"
            value={button.text}
            onChange={(e) => updateButton({ ...button, text: e.target.value })}
            key={elementClicked.id}
            placeholder="Testo del bottone"
          />
        </div>

        {/* Link Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Link</label>
          <Input
            type="url"
            value={button.href}
            onChange={(e) => updateButton({ ...button, href: e.target.value })}
            placeholder="https://..."
          />
        </div>

        {/* Background Color */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Colore di Sfondo</label>
          <div className="flex items-center gap-3">
            <Input
              type="color"
              value={button.bgColor}
              onChange={(e) => updateButton({ ...button, bgColor: e.target.value })}
              className="h-12 w-20 cursor-pointer rounded-lg border-2 border-border"
            />
            <div className="flex-1">
              <Input
                type="text"
                value={button.bgColor}
                onChange={(e) => updateButton({ ...button, bgColor: e.target.value })}
                placeholder="#007bff"
                className="font-mono text-sm"
              />
            </div>
          </div>
        </div>

        {/* Text Color */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Colore Testo</label>
          <div className="flex items-center gap-3">
            <Input
              type="color"
              value={button.textColor}
              onChange={(e) => updateButton({ ...button, textColor: e.target.value })}
              className="h-12 w-20 cursor-pointer rounded-lg border-2 border-border"
            />
            <div className="flex-1">
              <Input
                type="text"
                value={button.textColor}
                onChange={(e) => updateButton({ ...button, textColor: e.target.value })}
                placeholder="#ffffff"
                className="font-mono text-sm"
              />
            </div>
          </div>
        </div>

        {/* Border Radius */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Bordi Arrotondati</label>
            <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
              {button.borderRadius}px
            </span>
          </div>
          <input 
            className="w-full" 
            type="range" 
            min={0} 
            max={20} 
            value={button.borderRadius} 
            onChange={(e) => updateButton({ ...button, borderRadius: parseInt(e.target.value) })}
          />
        </div>
      </div>
    </div>
  );
};

export default ModifySidebarButton;

