// Import modul React dan useState dari paket 'react'
import React, { useState } from 'react';
// Import modul axios untuk melakukan HTTP requests
import axios from 'axios';

// Komponen RegisterQRCode
const RegisterQRCode = () => {
    // Mendefinisikan state qrCodeUrl dengan nilai awal kosong
    const [qrCodeUrl, setQrCodeUrl] = useState('');

    // Fungsi untuk mendaftarkan QR Code
    const registerQRCode = () => {
        // Mengirim POST request ke endpoint 'http://localhost:5000/register'
        axios.post('http://localhost:5000/register')
            .then(response => {
                // Mengatur state qrCodeUrl dengan URL QR Code yang diterima dari server
                setQrCodeUrl(response.data.qrCodeUrl);
            })
            .catch(error => {
                // Menangani error jika ada
                console.error('Error generating QR code:', error);
            });
    };

    // Render komponen
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            {/* Judul */}
            <h1 className="text-3xl font-bold mb-8 text-blue-600">Register QR Code</h1>
            {/* Tombol untuk menghasilkan QR Code */}
            <button 
                onClick={registerQRCode} 
                className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700"
            >
                Generate QR Code
            </button>
            {/* Menampilkan QR Code jika qrCodeUrl tidak kosong */}
            {qrCodeUrl && (
                <div className="mt-6">
                    <img src={qrCodeUrl} alt="QR Code" className="border-4 border-blue-500 rounded-lg" />
                </div>
            )}
        </div>
    );
};

// Mengekspor komponen RegisterQRCode sebagai default export
export default RegisterQRCode;
