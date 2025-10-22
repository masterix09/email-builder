export type ColumnElement = {
    id: string;
    name: string;
    type: string;
    content: string;
    icon: React.ReactNode;
    children?: ColumnElement[];
}