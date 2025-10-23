"use client"
import { addColumn, selectColumns, updateColumn } from '@/lib/features/counter/columnSlice'
import { useAppSelector } from '@/lib/hooks'
import { ColumnElement } from '@/lib/type'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ElementRenderer from '../elements/ElementRenderer'

const CanvasBody = () => {
  
  const dispatch = useDispatch();
  const columns = useAppSelector(selectColumns)
  const [draggedOverColumn, setDraggedOverColumn] = useState<string | null>(null)
  const [dragTimeout, setDragTimeout] = useState<NodeJS.Timeout | null>(null)
  
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dragTimeout) {
        clearTimeout(dragTimeout);
      }
    };
  }, [dragTimeout]);
  
  console.log("columns", columns)
  return (
    <div className="col-span-4 overflow-y-auto h-screen p-4 bg-gray-300">
        <div className='w-full h-full bg-white p-3 rounded-sm shadow-md flex flex-col gap-2 overflow-y-auto'
          onDragOver={(ev)  => {
            ev.preventDefault();
          }}
          onDrop={(ev) => {
            ev.preventDefault();
            const type = ev.dataTransfer.getData("type");
            if (type === "column") {
              const id = ev.dataTransfer.getData("id");
            const name = ev.dataTransfer.getData("name");
            const content = ev.dataTransfer.getData("content");
            dispatch(addColumn({
                id: id,
                name: name,
                type: type,
                content: content,
                icon: null,
                children: [],
              }));
            }
          }}
        >
          {columns.map((column) => (
            <div 
              id={column.id} 
              key={column.id} 
              data-column-id={column.id}
              className={`${column.content} w-full p-3 h-fit transition-colors duration-200 ${
                draggedOverColumn === column.id ? 'bg-green-300' : ''
              }`}
              onDragEnter={(ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                // Cancella qualsiasi timeout precedente
                if (dragTimeout) {
                  clearTimeout(dragTimeout);
                  setDragTimeout(null);
                }
                setDraggedOverColumn(column.id);
              }}
              onDragLeave={(ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                // Usa un timeout per gestire meglio le transizioni tra colonne
                const timeout = setTimeout(() => {
                  setDraggedOverColumn(null);
                }, 50);
                setDragTimeout(timeout);
              }}
              onDragOver={(ev) => {
                ev.preventDefault();
              }}
              onDrop={(ev) => {
                ev.preventDefault();
                setDraggedOverColumn(null);
                const id = ev.dataTransfer.getData("idEl");
                const name = ev.dataTransfer.getData("nameEl");
                const type = ev.dataTransfer.getData("typeEl");
                const content = ev.dataTransfer.getData("contentEl");
                dispatch(updateColumn({
                  id: column.id,
                  name: column.name,
                  type: column.type,
                  content: column.content,
                  icon: null,
                  children: [...(column.children || []), {id, name, type, content, icon: null} as unknown as ColumnElement],
                }));
              }}
            >
              {column.children?.map((child) => (
                <div 
                  id={child.id} 
                  key={child.id} 
                  className="w-full p-3 h-fit"
                  onDragEnter={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    // Mantieni la colonna come dragged over
                    setDraggedOverColumn(column.id);
                  }}
                  onDragLeave={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    // Non fare nulla, lascia che la colonna gestisca il drag leave
                  }}
                  onDragOver={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                  }}
                >
                  <ElementRenderer element={child} />
                </div>
              ))}
            </div>
          ))}
        </div>
    </div>
  )
}

export default CanvasBody