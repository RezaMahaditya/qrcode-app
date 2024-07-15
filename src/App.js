// Import modul React dari paket 'react'
import React from 'react';
// Import modul BrowserRouter, Route, Routes, dan Navigate dari 'react-router-dom' untuk routing
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// Import komponen RegisterQRCode dari file 'RegisterQRCode'
import RegisterQRCode from './RegisterQRCode';
// Import komponen ScanQRCode dari file 'ScanQRCode'
import ScanQRCode from './ScanQRCode';

// Komponen utama App
const App = () => {
    return (
        // Membungkus aplikasi dengan Router untuk mengelola routing
        <Router>
            <div className="App">
                {/* Mendefinisikan Routes untuk mengatur rute aplikasi */}
                <Routes>
                    {/* Rute untuk halaman pendaftaran QR Code */}
                    <Route path="/register" element={<RegisterQRCode />} />
                    {/* Rute untuk halaman pemindaian QR Code */}
                    <Route path="/scan" element={<ScanQRCode />} />
                    {/* Rute default yang mengarahkan ke halaman pendaftaran QR Code */}
                    <Route path="/" element={<Navigate to="/register" />} />
                </Routes>
            </div>
        </Router>
    );
};

// Mengekspor komponen App sebagai default export
export default App;
