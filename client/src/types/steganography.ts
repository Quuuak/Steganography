export interface StegConfig {
  encryptionKey: string;
  message: string;
}

export interface StegResult {
  success: boolean;
  error?: string;
  data?: string;
}

export type StegMode = 'encode' | 'decode';