import { Columns2, Columns3, Columns4, ImageIcon, LayoutGridIcon, TextIcon } from "lucide-react";
import { ColumnElement } from "./type";

export const coloumnElements: ColumnElement[] = [
    {
        id: "1",
        name: '1 colonna',
        type: 'column',
        content: 'grid grid-cols-1 gap-2',
        icon: <LayoutGridIcon className="size-5" />
    },
    {
        id: "2",
        name: '2 colonne',
        type: 'column',
        content: 'grid grid-cols-2 gap-2',
        icon: <Columns2 className="size-5" />
    },
    {
        id: "3",
        name: '3 colonne',
        type: 'column',
        content: 'grid grid-cols-3 gap-2',
        icon: <Columns3 className="size-5" />
    },
    {
        id: "4",
        name: '4 colonne',
        type: 'column',
        content: 'grid grid-cols-4 gap-2',
        icon: <Columns4 className="size-5" />
    },
]

export const componentElements: ColumnElement[]= [
    {
        id: "1",
        name: 'Immagine',
        type: 'image',
        content: '<img src="https://via.placeholder.com/150" alt="image" />',
        icon: <ImageIcon className="size-5" />
    },
    {
        id: "2",
        name: 'Testo',
        type: 'text',
        content: '<p>Testo</p>',
        icon: <TextIcon className="size-5" />
    }
]