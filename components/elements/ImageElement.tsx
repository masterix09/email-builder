import React from 'react';

interface ImageElementProps {
  content: string;
  id: string;
}

const ImageElement: React.FC<ImageElementProps> = ({ content, id }) => {
  // Estrae l'URL dell'immagine dal content HTML
  const extractImageSrc = (htmlContent: string): string => {
    const match = htmlContent.match(/src="([^"]*)"/);
    return match ? match[1] : 'https://via.placeholder.com/150';
  };

  const imageSrc = extractImageSrc(content);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <img 
        src={imageSrc} 
        alt="Elemento immagine" 
        className="max-w-full max-h-full object-contain"
        style={{ maxHeight: '100px' }}
      />
    </div>
  );
};

export default ImageElement;
