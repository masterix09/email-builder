"use client"
import { addColumn, selectColumns, updateColumn } from '@/lib/features/counter/columnSlice'
import { useAppSelector } from '@/lib/hooks'
import { ColumnElement } from '@/lib/type'
import React from 'react'
import { useDispatch } from 'react-redux'
import ElementRenderer from '../elements/ElementRenderer'

const CanvasBody = () => {
  const dispatch = useDispatch();
  const columns = useAppSelector(selectColumns)
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
            <div id={column.id} key={column.id} className={`${column.content} w-full p-3 h-fit`}
            onDragOver={(ev)  => {
              ev.preventDefault();
            }}
            onDrop={(ev) => {
              ev.preventDefault();
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
                <div id={child.id} key={child.id} className="w-full p-3 h-fit">
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