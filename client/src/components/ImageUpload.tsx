import React from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, className }) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  return (
    <div
      className={`border-2 border-dashed border-purple-500 rounded-lg p-8 text-center cursor-pointer hover:border-purple-400 transition-colors ${className}`}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
        id="image-upload"
      />
      <label htmlFor="image-upload" className="cursor-pointer">
        <Upload className="w-12 h-12 mx-auto mb-4 text-purple-500" />
        <p className="text-gray-300">Drag and drop an image here or click to select</p>
      </label>
    </div>
  );
};