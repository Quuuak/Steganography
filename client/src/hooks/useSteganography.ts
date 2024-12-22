import { useState, } from 'react';
import { StegMode, StegResult } from '../types/steganography';
import { Steganography } from '../utils/steganography';
import { encrypt, decrypt } from '../utils/encryption';

export function useSteganography() {
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [decodemessage, setDecodeMessage] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [mode, setMode] = useState<StegMode>('encode');
  const [loading, setLoading] = useState(false);

  const handleEncode = async (): Promise<StegResult> => {
    if (!image || !message || !encryptionKey) {
      return { success: false, error: 'Missing required fields' };
    }
    
    setLoading(true);
    try {
      const encrypted = encrypt(message, encryptionKey);
      const resultImage = await Steganography.hideMessage(image, encrypted);
      setResult(resultImage);
      return { success: true, data: resultImage };
    } catch (error) {
      console.error('Encoding failed:', error);
      return { success: false, error: 'Failed to encode message' };
    } finally {
      setLoading(false);
    }
  };

  const handleDecode = async (): Promise<StegResult> => {
    if (!image || !encryptionKey) {
      return { success: false, error: 'Missing required fields' };
    }
    
    setLoading(true);
    try {
      const extracted = await Steganography.extractMessage(image);
      const decrypted = decrypt(extracted, encryptionKey);
      setDecodeMessage(decrypted);
      return { success: true, data: decrypted };
    } catch (error) {
      console.error('Decoding failed:', error);
      return { success: false, error: 'Failed to decode message' };
    } finally {
      setLoading(false);
    }
  };

  const handleAIImageGenerated = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], 'ai-generated.png', { type: 'image/png' });
      setImage(file);
    } catch (error) {
      console.error('Failed to process AI generated image:', error);
    }
  };

  return {
    state: {
      image,
      message,
      decodemessage,
      encryptionKey,
      result,
      mode,
      loading
    },
    actions: {
      setImage,
      setMessage,
      setDecodeMessage,
      setEncryptionKey,
      setMode,
      handleEncode,
      handleDecode,
      handleAIImageGenerated
    }
  };
}