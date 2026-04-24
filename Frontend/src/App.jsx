import React from 'react';
import { Toaster } from 'react-hot-toast';
import AppRouter from './router/index';

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { borderRadius: '12px', fontSize: '14px' },
        }}
      />
      <AppRouter />
    </>
  );
}

export default App;
