import React from 'react';
import { Lock, Unlock } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import { AIImageGenerator } from './AIImageGenerator';
import { StegMode } from '../types/steganography';

interface StegFormProps {
  mode: StegMode;
  setMode: (mode: StegMode) => void;
  message: string;
  setMessage: (message: string) => void;
  decodemessage: string;
  setDecodeMessage: (message: string) => void;
  encryptionKey: string;
  setEncryptionKey: (key: string) => void;
  onImageSelect: (file: File) => void;
  onAIImageGenerated: (imageUrl: string) => Promise<void>;
  onSubmit: () => void;
  loading: boolean;
}

export const StegForm: React.FC<StegFormProps> = ({
  mode,
  setMode,
  message,
  setMessage,
  decodemessage,
  setDecodeMessage,
  encryptionKey,
  setEncryptionKey,
  onImageSelect,
  onAIImageGenerated,
  onSubmit,
  loading,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setMode('encode')}
          className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center space-x-2 ${
            mode === 'encode' ? 'bg-purple-600' : 'bg-gray-700'
          }`}
        >
          <Lock size={20} />
          <span>Encode</span>
        </button>
        <button
          onClick={() => setMode('decode')}
          className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center space-x-2 ${
            mode === 'decode' ? 'bg-purple-600' : 'bg-gray-700'
          }`}
        >
          <Unlock size={20} />
          <span>Decode</span>
        </button>
      </div>

      {mode === 'encode' && (
        <AIImageGenerator
          onImageGenerated={onAIImageGenerated}
          disabled={loading}
        />
      )}

      <ImageUpload onImageSelect={onImageSelect} />

      <input
        type="password"
        placeholder="Encryption Key"
        value={ encryptionKey }
        onChange={(e) => setEncryptionKey(e.target.value)}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
      />

      <textarea
        placeholder={mode === 'encode' ? 'Enter your secret message' : 'Decoded message will appear here'}
        value={mode === 'encode' ? message : decodemessage}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full h-32 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
      
      />

      <button
        onClick={onSubmit}

        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50"
      >
        {loading ? 'Processing...' : mode === 'encode' ? 'Hide Message' : 'Extract Message'}
      </button>
    </div>
  );
};