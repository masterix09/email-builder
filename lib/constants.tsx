import { Columns2, Columns3, Columns4, ImageIcon, LayoutGridIcon, TextIcon } from "lucide-react";
import { ColumnElement } from "./type";

export const coloumnElements: ColumnElement[] = [
    {
        id: "1",
        name: '1 colonna',
        type: 'column',
        content: 'grid grid-cols-1 border-2 border-gray-300',
        icon: <LayoutGridIcon className="size-4 group-hover:text-white transition-all duration-300" />
    },
    {
        id: "2",
        name: '2 colonne',
        type: 'column',
        content: 'grid grid-cols-2 border-2 border-gray-300',
        icon: <Columns2 className="size-4 group-hover:text-white transition-all duration-300" />
    },
    {
        id: "3",
        name: '3 colonne',
        type: 'column',
        content: 'grid grid-cols-3 border-2 border-gray-300',
        icon: <Columns3 className="size-4 group-hover:text-white transition-all duration-300" />
    },
    {
        id: "4",
        name: '4 colonne',
        type: 'column',
        content: 'grid grid-cols-4 border-2 border-gray-300',
        icon: <Columns4 className="size-4 group-hover:text-white transition-all duration-300" />
    },
]

export const componentElements: ColumnElement[]= [
    {
        id: "1",
        name: 'Immagine',
        type: 'image',
        content: '<img src="https://via.placeholder.com/150" alt="image" />',
        icon: <ImageIcon className="size-4 group-hover:text-white transition-all duration-300" />
    },
    {
        id: "2",
        name: 'Testo',
        type: 'text',
        content: '<p>Testo</p>',
        icon: <TextIcon className="size-4 group-hover:text-white transition-all duration-300" />
    }
]