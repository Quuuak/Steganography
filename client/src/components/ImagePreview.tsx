import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface ImagePreviewProps {
  mode: 'encode' | 'decode';
  image: File | null;
  result: string | null;
}
const handleRefresh = () =>{
  window.location.reload(false); 
}
export const ImagePreview: React.FC<ImagePreviewProps> = ({ mode, image, result }) => {
  const displayImage = mode === 'encode' ? (result || (image && URL.createObjectURL(image))) : (image && URL.createObjectURL(image));

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <ImageIcon className="mr-2" />
        {mode === 'encode' ? (result ? 'Result Image' : 'Input Image') : 'Input Image'}
      </h2>
      {displayImage && (
        <div className="relative aspect-square">
          <img
            src={displayImage}
            alt="Preview"
            className="rounded-lg w-full h-full object-contain"
          />
        </div>
      )}
      {mode === 'encode' && result && (
        <a
          href={result}
          download="stego-image.png"
          onClick={handleRefresh}
          className="block mt-4 text-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Download Image
        </a>
      )}
    </div>
  );
};