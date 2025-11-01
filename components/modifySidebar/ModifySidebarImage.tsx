"use client";
import { useAppSelector } from "@/lib/hooks";
import React, { useMemo } from "react";
import { Input } from "../ui/input";
import { useDispatch } from "react-redux";
import { updateColumn } from "@/lib/features/columns/columnSlice";

const ModifySidebarImage = () => {
  const elementClicked = useAppSelector((state) => state.elementClicked);
  const columns = useAppSelector((state) => state.column);
  const element = columns.map((column) =>
    column.children?.find((element) => element.id === elementClicked.id)
  );
  const dispatch = useDispatch();

  // Estrae informazioni dal content HTML
  const imageInfo = useMemo(() => {
    if (element?.[0]?.content) {
      const srcMatch = element[0].content.match(/src="([^"]*)"/);
      const altMatch = element[0].content.match(/alt="([^"]*)"/);
      
      return {
        src: srcMatch ? srcMatch[1] : 'https://via.placeholder.com/150',
        alt: altMatch ? altMatch[1] : 'image',
      };
    }
    return {
      src: 'https://via.placeholder.com/150',
      alt: 'image',
    };
  }, [element]);

  const image = imageInfo;

  // Funzione per aggiornare l'immagine
  const updateImage = (newImage: typeof image) => {
    const updatedImage = { ...image, ...newImage };
    const columnSelected = columns.find((element) => element !== undefined);
    const newChildren = columnSelected?.children?.map((child) =>
      child.id === elementClicked.id
        ? {
            id: child.id,
            name: child.name,
            type: child.type,
            content: `<img src="${updatedImage.src}" alt="${updatedImage.alt}" />`,
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
          <h1 className="text-lg font-semibold text-foreground">Proprietà Immagine</h1>
          <p className="text-xs text-muted-foreground">Personalizza l&apos;immagine</p>
        </div>

        {/* Image URL */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">URL Immagine</label>
          <Input
            type="url"
            value={image.src}
            onChange={(e) => updateImage({ ...image, src: e.target.value })}
            key={elementClicked.id}
            placeholder="https://..."
          />
        </div>

        {/* Alt Text */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Testo Alternativo</label>
          <Input
            type="text"
            value={image.alt}
            onChange={(e) => updateImage({ ...image, alt: e.target.value })}
            placeholder="Descrizione immagine"
          />
        </div>

        {/* Preview */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Anteprima</label>
          <div className="w-full p-4 bg-muted/30 rounded-lg flex items-center justify-center">
            <img 
              src={image.src} 
              alt={image.alt} 
              className="max-w-full max-h-48 object-contain rounded-md"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifySidebarImage;

