"use client";
import React from "react";
import { Button } from "../ui/button";
import { coloumnElements, componentElements } from "@/lib/constants";
import { Layers2, Component } from "lucide-react";

const SidebarBody = () => {
  return (
    <div className="col-span-1 lg:col-span-1 overflow-y-auto h-full bg-sidebar border-r border-sidebar-border">
      <div className="p-4 space-y-6">
        {/* Colonne Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-2">
            <Layers2 className="size-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Colonne</h2>
          </div>
          <div className="grid grid-cols-1 gap-2.5">
            {coloumnElements.map((element) => (
              <Button
                key={element.id}
                variant="outline"
                className="w-full h-auto p-4 group hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-md active:scale-95 transition-all duration-200 flex flex-col items-center justify-center gap-2 border-2 bg-card cursor-grab active:cursor-grabbing"
                onDragStart={(ev) => {
                  ev.dataTransfer.setData("id", Date.now().toString());
                  ev.dataTransfer.setData("name", element.name);
                  ev.dataTransfer.setData("type", element.type);
                  ev.dataTransfer.setData("content", element.content);
                }}
                draggable={true}
              >
                <div className="text-primary group-hover:text-primary-foreground transition-colors">
                  {element.icon}
                </div>
                <span className="text-xs font-medium transition-colors">
                  {element.name}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Elementi Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-2">
            <Component className="size-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Elementi</h2>
          </div>
          <div className="grid grid-cols-1 gap-2.5">
            {componentElements.map((element) => (
              <Button
                key={element.id}
                variant="outline"
                className="w-full h-auto p-4 group hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-md active:scale-95 transition-all duration-200 flex flex-col items-center justify-center gap-2 border-2 bg-card cursor-grab active:cursor-grabbing"
                onDragStart={(ev) => {
                  ev.dataTransfer.setData("idEl", Date.now().toString());
                  ev.dataTransfer.setData("nameEl", element.name);
                  ev.dataTransfer.setData("typeEl", element.type);
                  ev.dataTransfer.setData("contentEl", element.content);
                }}
                draggable={true}
              >
                <div className="text-primary group-hover:text-primary-foreground transition-colors">
                  {element.icon}
                </div>
                <span className="text-xs font-medium transition-colors">
                  {element.name}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarBody;
