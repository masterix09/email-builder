"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useAppSelector } from "@/lib/hooks";
import { extractBackgroundColor } from "@/lib/utils";
import { updateColumn } from "@/lib/features/columns/columnSlice";
import { useDispatch } from "react-redux";

const ModifyColumn = () => {
  const elementClicked = useAppSelector((state) => state.elementClicked);
  const columns = useAppSelector((state) => state.column);
  const column = columns.find((el) => el.id === elementClicked.id);
  const dispatch = useDispatch();
  const bgColor = extractBackgroundColor(column?.content || "") || "#ffffff";
  const [backgroundColor, setBackgroundColor] = useState<string>(bgColor);
  useEffect(() => {
    setBackgroundColor(bgColor);
  }, [bgColor]);
  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-lg font-semibold text-foreground">Proprietà Colonna</h1>
          <p className="text-xs text-muted-foreground">Personalizza l&apos;aspetto della colonna</p>
        </div>

        {/* Background Color Section */}
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              Colore di sfondo
            </label>
            <p className="text-xs text-muted-foreground">
              Scegli il colore di sfondo per questa colonna
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Input
              type="color"
              value={backgroundColor}
              onChange={(e) => {
                setBackgroundColor(e.target.value);
                const currentContent = column?.content || "";
                const contentWithoutBg = currentContent.replace(
                  /\s*bg-\[[^\]]+\]/g,
                  ""
                );
                const newContent =
                  `${contentWithoutBg} bg-[${e.target.value}]`.trim();

                dispatch(
                  updateColumn({
                    id: column?.id || "",
                    name: column?.name || "",
                    type: column?.type || "",
                    content: newContent,
                    icon: null,
                    children: column?.children || [],
                  })
                );
              }}
              className="h-12 w-20 cursor-pointer rounded-lg border-2 border-border"
            />
            <div className="flex-1">
              <Input
                type="text"
                value={backgroundColor}
                onChange={(e) => {
                  const value = e.target.value;
                  setBackgroundColor(value);
                  const currentContent = column?.content || "";
                  const contentWithoutBg = currentContent.replace(
                    /\s*bg-\[[^\]]+\]/g,
                    ""
                  );
                  const newContent =
                    `${contentWithoutBg} bg-[${value}]`.trim();

                  dispatch(
                    updateColumn({
                      id: column?.id || "",
                      name: column?.name || "",
                      type: column?.type || "",
                      content: newContent,
                      icon: null,
                      children: column?.children || [],
                    })
                  );
                }}
                placeholder="#ffffff"
                className="font-mono text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifyColumn;
