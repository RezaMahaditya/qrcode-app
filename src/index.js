// Import modul React dari paket 'react'
import React from 'react';
// Import fungsi createRoot dari 'react-dom/client' untuk membuat root dari aplikasi React
import { createRoot } from 'react-dom/client';
// Import file CSS untuk styling global
import './index.css';
// Import komponen utama App dari file 'App'
import App from './App';

// Mendapatkan elemen HTML dengan id 'root' yang akan menjadi root dari aplikasi React
const container = document.getElementById('root');
// Membuat root React pada elemen container
const root = createRoot(container);

// Merender aplikasi React dengan mode strict
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
