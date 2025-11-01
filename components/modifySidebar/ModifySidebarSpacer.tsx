"use client";
import { useAppSelector } from "@/lib/hooks";
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { updateColumn } from "@/lib/features/columns/columnSlice";

const ModifySidebarSpacer = () => {
  const elementClicked = useAppSelector((state) => state.elementClicked);
  const columns = useAppSelector((state) => state.column);
  const element = columns.map((column) =>
    column.children?.find((element) => element.id === elementClicked.id)
  );
  const dispatch = useDispatch();

  // Estrae informazioni dal content HTML
  const spacerInfo = useMemo(() => {
    if (element?.[0]?.content) {
      const heightMatch = element[0].content.match(/height:\s*(\d+)px/);
      
      return {
        height: heightMatch ? parseInt(heightMatch[1]) : 20,
      };
    }
    return {
      height: 20,
    };
  }, [element]);

  const spacer = spacerInfo;

  // Funzione per aggiornare lo spazio
  const updateSpacer = (newSpacer: typeof spacer) => {
    const updatedSpacer = { ...spacer, ...newSpacer };
    const columnSelected = columns.find((element) => element !== undefined);
    const newChildren = columnSelected?.children?.map((child) =>
      child.id === elementClicked.id
        ? {
            id: child.id,
            name: child.name,
            type: child.type,
            content: `<div style="height: ${updatedSpacer.height}px;"></div>`,
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
          <h1 className="text-lg font-semibold text-foreground">Proprietà Spazio</h1>
          <p className="text-xs text-muted-foreground">Regola l&apos;altezza dello spazio</p>
        </div>

        {/* Height */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Altezza</label>
            <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
              {spacer.height}px
            </span>
          </div>
          <input 
            className="w-full" 
            type="range" 
            min={10} 
            max={200} 
            value={spacer.height} 
            onChange={(e) => updateSpacer({ ...spacer, height: parseInt(e.target.value) })}
          />
        </div>
      </div>
    </div>
  );
};

export default ModifySidebarSpacer;

