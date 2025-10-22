"use client";
import React from "react";
import { Button } from "../ui/button";
import { coloumnElements, componentElements } from "@/lib/constants";

const SidebarBody = () => {
  return (
    <div className="overflow-y-auto h-screen p-4 shadow-md">
      <h1 className="text-lg lg:text-3xl mb-4 font-semibold">Colonne</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {coloumnElements.map((element) => (
          <Button
            key={element.id}
            variant="outline"
            className="w-full h-fit group hover:bg-purple-300 hover:border-black hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center"
            onDragStart={(ev) => {
              // dispatch(addColumn({
              //     id: Date.now().toString(),
              //     name: element.name,
              //     type: element.type,
              //     content: element.content,
              //     icon: null
              // }));
              // Add different types of drag data
              ev.dataTransfer.setData("id", Date.now().toString());
              ev.dataTransfer.setData("name", element.name);
              ev.dataTransfer.setData("type", element.type);
              ev.dataTransfer.setData("content", element.content);
            }}
            draggable={true}
          >
            {element.icon}
            <span className="text-sm group-hover:text-white transition-all duration-300">
              {element.name}
            </span>
          </Button>
        ))}
      </div>
      <h1 className="text-lg lg:text-3xl my-4 font-semibold">Elementi</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {componentElements.map((element) => (
          <Button
            key={element.id}
            variant="outline"
            className="w-full h-fit group hover:bg-purple-300 hover:border-black hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center"
            onDragStart={(ev) => {
              // dispatch(addColumn({
              //     id: Date.now().toString(),
              //     name: element.name,
              //     type: element.type,
              //     content: element.content,
              //     icon: null
              // }));
              // Add different types of drag data
              ev.dataTransfer.setData("idEl", Date.now().toString());
              ev.dataTransfer.setData("nameEl", element.name);
              ev.dataTransfer.setData("typeEl", element.type);
              ev.dataTransfer.setData("contentEl", element.content);
            }}
            draggable={true}
          >
            {element.icon}
            <span className="text-sm group-hover:text-white transition-all duration-300">
              {element.name}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SidebarBody;
