"use client";
import { useAppSelector } from "@/lib/hooks";
import React, { useMemo } from "react";
import { Input } from "../ui/input";
import { useDispatch } from "react-redux";
import { updateColumn } from "@/lib/features/columns/columnSlice";

const ModifySidebarDivider = () => {
  const elementClicked = useAppSelector((state) => state.elementClicked);
  const columns = useAppSelector((state) => state.column);
  const element = columns.map((column) =>
    column.children?.find((element) => element.id === elementClicked.id)
  );
  const dispatch = useDispatch();

  // Estrae informazioni dal content HTML
  const dividerInfo = useMemo(() => {
    if (element?.[0]?.content) {
      const colorMatch = element[0].content.match(/border-top:\s*\d+px\s+solid\s+([^;]+);/);
      const marginMatch = element[0].content.match(/margin:\s*([^;]+);/);
      const widthMatch = element[0].content.match(/border-top:\s*(\d+)px/);
      
      return {
        color: colorMatch ? colorMatch[1].trim() : '#e0e0e0',
        margin: marginMatch ? marginMatch[1].trim() : '20px 0',
        width: widthMatch ? parseInt(widthMatch[1]) : 1,
      };
    }
    return {
      color: '#e0e0e0',
      margin: '20px 0',
      width: 1,
    };
  }, [element]);

  const divider = dividerInfo;

  // Funzione per aggiornare il divisore
  const updateDivider = (newDivider: typeof divider) => {
    const updatedDivider = { ...divider, ...newDivider };
    const columnSelected = columns.find((element) => element !== undefined);
    const newChildren = columnSelected?.children?.map((child) =>
      child.id === elementClicked.id
        ? {
            id: child.id,
            name: child.name,
            type: child.type,
            content: `<hr style="border: none; border-top: ${updatedDivider.width}px solid ${updatedDivider.color}; margin: ${updatedDivider.margin};" />`,
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
          <h1 className="text-lg font-semibold text-foreground">Proprietà Divisore</h1>
          <p className="text-xs text-muted-foreground">Personalizza l&apos;aspetto del divisore</p>
        </div>

        {/* Color */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Colore</label>
          <div className="flex items-center gap-3">
            <Input
              type="color"
              value={divider.color}
              onChange={(e) => updateDivider({ ...divider, color: e.target.value })}
              className="h-12 w-20 cursor-pointer rounded-lg border-2 border-border"
            />
            <div className="flex-1">
              <Input
                type="text"
                value={divider.color}
                onChange={(e) => updateDivider({ ...divider, color: e.target.value })}
                placeholder="#e0e0e0"
                className="font-mono text-sm"
              />
            </div>
          </div>
        </div>

        {/* Width */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Spessore</label>
            <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
              {divider.width}px
            </span>
          </div>
          <input 
            className="w-full" 
            type="range" 
            min={1} 
            max={10} 
            value={divider.width} 
            onChange={(e) => updateDivider({ ...divider, width: parseInt(e.target.value) })}
          />
        </div>

        {/* Margin */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Margine (es: 20px 0)</label>
          <Input
            type="text"
            value={divider.margin}
            onChange={(e) => updateDivider({ ...divider, margin: e.target.value })}
            placeholder="20px 0"
          />
        </div>
      </div>
    </div>
  );
};

export default ModifySidebarDivider;

