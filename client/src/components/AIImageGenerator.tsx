import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { generateImage } from '../utils/aiService';

interface AIImageGeneratorProps {
  onImageGenerated: (imageUrl: string) => void;
  disabled?: boolean;
}

export const AIImageGenerator: React.FC<AIImageGeneratorProps> = ({ onImageGenerated, disabled }) => {
  const [prompt, setPrompt] = useState('nature');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt) return;

    setLoading(true);
    setError('');
    try {
      const imageUrl = await generateImage(prompt);
      onImageGenerated(imageUrl);
      setPrompt('nature');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate image');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Wand2 className="text-purple-400" size={20} />
        <h3 className="text-lg font-semibold">AI Image Generator</h3>
      </div>
      
      <div className="space-y-2">
        
        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}
        
        <button
          onClick={handleGenerate}
          disabled={disabled || loading || !prompt}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          <Wand2 size={16} />
          <span>{loading ? 'Generating...' : 'Generate Image'}</span>
        </button>
      </div>
    </div>
  );
};