"use client"
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { useAppSelector } from '@/lib/hooks'
import { extractBackgroundColor } from '@/lib/utils'
import { updateColumn } from '@/lib/features/counter/columnSlice'
import { useDispatch } from 'react-redux'

const ModifyColumn = () => {
    const elementClicked = useAppSelector((state) => state.elementClicked)
    const columns = useAppSelector((state) => state.column)
    const column = columns.find((column) => column.id === elementClicked.id)
    const [backgroundColor, setBackgroundColor] = useState<string>(extractBackgroundColor(column?.content || ''))
    const dispatch = useDispatch()
  return (
    <div className='w-full h-full p-3'>
        <h1 className='text-lg font-bold'>Colonne</h1>
        <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2'>
                <h2 className='text-sm font-bold'>Background color</h2>
                <Input type='color' value={backgroundColor} onChange={(e) => {
                    setBackgroundColor(e.target.value);
                    
                    // Rimuove eventuali classi bg-[valore] esistenti e aggiunge la nuova
                    const currentContent = column?.content || '';
                    const contentWithoutBg = currentContent.replace(/\s*bg-\[[^\]]+\]/g, '');
                    const newContent = `${contentWithoutBg} bg-[${e.target.value}]`.trim();
                    
                    dispatch(updateColumn({
                        id: column?.id || '',
                        name: column?.name || '',
                        type: column?.type || '',
                        content: newContent,
                        icon: null,
                        children: column?.children || []
                    }))
                }} />
            </div>
        </div>
    </div>
  )
}

export default ModifyColumn