"use client"
import { useAppSelector } from '@/lib/hooks';
import React, { useState } from 'react'
import { Input } from '../ui/input';
import { extractText } from '@/lib/utils';
import { Button } from '../ui/button';
import { useDispatch } from 'react-redux';
import { updateColumn } from '@/lib/features/counter/columnSlice';
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react';


interface ITextFormat {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    text: string;
}

const ModifySidebarText = () => {
    const elementClicked = useAppSelector(state => state.elementClicked);
    const columns = useAppSelector(state => state.column);
    const element = columns.map(column => column.children?.find(element => element.id === elementClicked.id));
    const [text, setText] = useState<ITextFormat>({
        text: extractText(element?.[0]?.content || '<p>Testo</p>'),
        bold: false,
        italic: false,
        underline: false,
    });
    const dispatch = useDispatch();
    const columnSelected = columns.find(element => element !== undefined);
    const newChildren = columnSelected?.children?.map(child => child.id === elementClicked.id ? {
        id: child.id,
        name: child.name,
        type: child.type,
        content: `<p>${text.bold ? '<strong>' : ''}${text.italic ? '<em>' : ''}${text.underline ? '<u>' : ''}${text.text}${text.bold ? '</strong>' : ''}${text.italic ? '</em>' : ''}${text.underline ? '</u>' : ''}</p>`,
        icon: null,
    } : child);
  return (
    <div className='p-3'>
        <h1 className='text-lg font-bold'>Modifica elemento</h1>
        <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2'>
                <h2 className='text-sm font-bold'>Testo</h2>
                <Input type='text' value={text.text} onChange={(e) => setText({...text, text: e.target.value})}/>
            </div>
            <div className='flex justify-between items-center gap-2 flex-1'>
                <Button variant={text.bold ? 'default' : 'outline'} onClick={() => setText({...text, bold: !text.bold})}><BoldIcon /></Button>
                <Button variant={text.underline ? 'default' : 'outline'} onClick={() => setText({...text, underline: !text.underline})}><UnderlineIcon /></Button>
                <Button variant={text.italic ? 'default' : 'outline'} onClick={() => setText({...text, italic: !text.italic})}><ItalicIcon /></Button>
            </div>
            <Button variant='default' onClick={() => dispatch(updateColumn({
                id: columnSelected?.id || '',
                name: columnSelected?.name || '',
                type: columnSelected?.type || '',
                content: columnSelected?.content || '',
                icon: null,
                children: newChildren || [],
            }))}>Salva</Button>
        </div>
    </div>
  )
}

export default ModifySidebarText