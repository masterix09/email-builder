import { Columns2, Columns3, Columns4, ImageIcon, LayoutGridIcon, TextIcon, CircleArrowRight, Minus, Space, Link2, Heading } from "lucide-react";
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
        content: '<p class="w-fit">Testo</p>',
        icon: <TextIcon className="size-5" />
    },
    {
        id: "3",
        name: 'Bottone',
        type: 'button',
        content: '<a href="#" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: 500;">Clicca qui</a>',
        icon: <CircleArrowRight className="size-5" />
    },
    {
        id: "4",
        name: 'Divisore',
        type: 'divider',
        content: '<hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />',
        icon: <Minus className="size-5" />
    },
    {
        id: "5",
        name: 'Spazio',
        type: 'spacer',
        content: '<div style="height: 20px;"></div>',
        icon: <Space className="size-5" />
    },
    {
        id: "6",
        name: 'Link',
        type: 'link',
        content: '<a href="#" style="color: #007bff; text-decoration: underline;">Collegamento</a>',
        icon: <Link2 className="size-5" />
    },
    {
        id: "7",
        name: 'Intestazione',
        type: 'heading',
        content: '<h2 style="font-size: 24px; font-weight: bold; margin: 0; color: #000000;">Intestazione</h2>',
        icon: <Heading className="size-5" />
    }
]