// Import modul React dan useState dari paket 'react'
import React, { useState } from 'react';
// Import modul BrowserMultiFormatReader dari '@zxing/library' untuk membaca kode QR
import { BrowserMultiFormatReader } from '@zxing/library';
// Import modul axios untuk melakukan HTTP requests
import axios from 'axios';

// Komponen ScanQRCode
const ScanQRCode = () => {
    // Mendefinisikan state userId dan countdown
    const [userId, setUserId] = useState('');
    const [countdown, setCountdown] = useState(0);

    // Fungsi untuk memulai pemindaian QR Code
    const startScan = () => {
        const codeReader = new BrowserMultiFormatReader();
        // Memulai pemindaian dari perangkat video input
        codeReader.decodeFromInputVideoDevice(undefined, 'video').then((result) => {
            const scannedUrl = result.text; // Mendapatkan URL dari hasil pemindaian
            validateQRCode(scannedUrl); // Memvalidasi QR Code
        }).catch(err => {
            console.error(err); // Menangani error jika ada
        });
    };

    // Fungsi untuk memvalidasi QR Code
    const validateQRCode = (qrCodeUrl) => {
        // Mengirim POST request ke endpoint 'http://localhost:5000/validate' dengan URL QR Code
        axios.post('http://localhost:5000/validate', { qrCodeUrl })
            .then(response => {
                if (response.data.valid) {
                    setUserId(qrCodeUrl.split('/').pop()); // Mengatur userId dari URL
                    startCountdown(); // Memulai hitungan mundur
                } else {
                    alert(response.data.message); // Menampilkan pesan error jika QR Code tidak valid
                }
            })
            .catch(error => {
                console.error('Error validating QR code:', error); // Menangani error jika ada
            });
    };

    // Fungsi untuk memulai hitungan mundur
    const startCountdown = () => {
        setCountdown(30); // Mengatur hitungan mundur awal ke 30 detik
        const interval = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown <= 1) {
                    clearInterval(interval); // Menghentikan interval ketika hitungan mencapai 0
                    return 0;
                }
                return prevCountdown - 1; // Mengurangi hitungan setiap detik
            });
        }, 1000);

        setTimeout(() => {
            setUserId(''); // Mengatur ulang userId setelah 30 detik
            setCountdown(0); // Mengatur ulang hitungan mundur setelah 30 detik
        }, 30000); // Reset userId and countdown after 30 seconds
    };

    // Render komponen
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            {/* Judul */}
            <h1 className="text-3xl font-bold mb-8 text-green-600">Scan QR Code</h1>
            {/* Elemen video untuk menampilkan video dari kamera */}
            <video id="video" width="300" height="200" className="border-4 border-green-500 rounded-lg shadow-lg"></video>
            {/* Tombol untuk memulai pemindaian QR Code */}
            <button 
                onClick={startScan} 
                className="mt-6 px-6 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-700"
            >
                Start Scan
            </button>
            {/* Menampilkan userId dan hitungan mundur jika userId tidak kosong */}
            {userId && (
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold text-green-600">Scanned User ID: {userId}</h2>
                    <h2 className="text-2xl font-semibold text-red-600">Countdown: {countdown} seconds</h2>
                </div>
            )}
        </div>
    );
};

// Mengekspor komponen ScanQRCode sebagai default export
export default ScanQRCode;
