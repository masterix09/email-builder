import React from 'react';
import { ColumnElement } from '@/lib/type';
import ImageElement from './ImageElement';
import TextElement from './TextElement';

interface ElementRendererProps {
  element: ColumnElement;
}

const ElementRenderer: React.FC<ElementRendererProps> = ({ element }) => {
  const renderElement = () => {
    switch (element.type) {
      case 'image':
        return <ImageElement content={element.content} id={element.id} />;
      case 'text':
        return <TextElement content={element.content} id={element.id} />;
      default:
        return (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            Tipo elemento non supportato: {element.type}
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full border border-border rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow duration-200 z-10 overflow-hidden">
      {renderElement()}
    </div>
  );
};

export default ElementRenderer;
