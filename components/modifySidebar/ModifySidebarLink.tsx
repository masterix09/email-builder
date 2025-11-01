"use client";
import { useAppSelector } from "@/lib/hooks";
import React, { useMemo } from "react";
import { Input } from "../ui/input";
import { useDispatch } from "react-redux";
import { updateColumn } from "@/lib/features/columns/columnSlice";

const ModifySidebarLink = () => {
  const elementClicked = useAppSelector((state) => state.elementClicked);
  const columns = useAppSelector((state) => state.column);
  const element = columns.map((column) =>
    column.children?.find((element) => element.id === elementClicked.id)
  );
  const dispatch = useDispatch();

  // Estrae informazioni dal content HTML
  const linkInfo = useMemo(() => {
    if (element?.[0]?.content) {
      const textMatch = element[0].content.match(/>([^<]+)</);
      const hrefMatch = element[0].content.match(/href="([^"]*)"/);
      const colorMatch = element[0].content.match(/color:\s*([^;]+);/);
      
      return {
        text: textMatch ? textMatch[1] : 'Collegamento',
        href: hrefMatch ? hrefMatch[1] : '#',
        color: colorMatch ? colorMatch[1].trim() : '#007bff',
      };
    }
    return {
      text: 'Collegamento',
      href: '#',
      color: '#007bff',
    };
  }, [element]);

  const link = linkInfo;

  // Funzione per aggiornare il link
  const updateLink = (newLink: typeof link) => {
    const updatedLink = { ...link, ...newLink };
    const columnSelected = columns.find((element) => element !== undefined);
    const newChildren = columnSelected?.children?.map((child) =>
      child.id === elementClicked.id
        ? {
            id: child.id,
            name: child.name,
            type: child.type,
            content: `<a href="${updatedLink.href}" style="color: ${updatedLink.color}; text-decoration: underline;">${updatedLink.text}</a>`,
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
          <h1 className="text-lg font-semibold text-foreground">Proprietà Link</h1>
          <p className="text-xs text-muted-foreground">Personalizza il collegamento</p>
        </div>

        {/* Text Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Testo</label>
          <Input
            type="text"
            value={link.text}
            onChange={(e) => updateLink({ ...link, text: e.target.value })}
            key={elementClicked.id}
            placeholder="Testo del link"
          />
        </div>

        {/* Link Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">URL</label>
          <Input
            type="url"
            value={link.href}
            onChange={(e) => updateLink({ ...link, href: e.target.value })}
            placeholder="https://..."
          />
        </div>

        {/* Color */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Colore</label>
          <div className="flex items-center gap-3">
            <Input
              type="color"
              value={link.color}
              onChange={(e) => updateLink({ ...link, color: e.target.value })}
              className="h-12 w-20 cursor-pointer rounded-lg border-2 border-border"
            />
            <div className="flex-1">
              <Input
                type="text"
                value={link.color}
                onChange={(e) => updateLink({ ...link, color: e.target.value })}
                placeholder="#007bff"
                className="font-mono text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifySidebarLink;

