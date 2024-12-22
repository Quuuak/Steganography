import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUpPage from './auth/SignUpPage';
import LoginPage from './auth/LoginPage';
import { StegForm } from './components/StegForm';
import { ImagePreview } from './components/ImagePreview';
import { useSteganography } from './hooks/useSteganography';
import { Header } from './components/Header';

const StegApp: React.FC = () => {
  const {
    state: { image, message, decodemessage, encryptionKey, result, mode, loading },
    actions: {
      setImage,
      setMessage,
      setDecodeMessage,
      setEncryptionKey,
      setMode,
      handleEncode,
      handleDecode,
      handleAIImageGenerated,
    },
  } = useSteganography();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header/>
      <div className="container mx-auto px-4 pb-8">
        <div className="grid md:grid-cols-2 gap-8">
          <StegForm
            mode={mode}
            setMode={setMode}
            message={message}
            setMessage={setMessage}
            decodemessage={decodemessage}
            setDecodeMessage={setDecodeMessage}
            encryptionKey={encryptionKey}
            setEncryptionKey={setEncryptionKey}
            onImageSelect={setImage}
            onAIImageGenerated={handleAIImageGenerated}
            onSubmit={mode === 'encode' ? handleEncode : handleDecode}
            loading={loading}
          />
          <ImagePreview mode={mode} image={image} result={result} />
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/stegapp" element={<StegApp />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
