// Import modul express
const express = require("express");
// Inisialisasi aplikasi express
const app = express();
// Import modul mysql2 untuk koneksi ke database
const mysql = require("mysql2");
// Import modul body-parser untuk memparsing request body
const bodyParser = require("body-parser");
// Import modul uuid untuk membuat UUID (Universally Unique Identifier)
const { v4: uuidv4 } = require("uuid");
// Import modul qrcode untuk membuat QR Code
const QRCode = require("qrcode");
// Import modul cors untuk mengizinkan Cross-Origin Resource Sharing
const cors = require("cors");

// Menggunakan middleware body-parser untuk memparsing JSON
app.use(bodyParser.json());
// Menggunakan middleware cors dengan konfigurasi khusus
app.use(
  cors({
    origin: "http://localhost:3000", // Mengizinkan permintaan dari localhost:3000
    methods: ["GET", "POST"], // Mengizinkan metode GET dan POST
    allowedHeaders: ["Content-Type"], // Mengizinkan header "Content-Type"
  })
);

// Membuat koneksi ke database MySQL
const db = mysql.createConnection({
  host: "localhost", // Host database
  user: "root", // Username database
  password: "titutoioi123", // Password database
  database: "qrcode_db", // Nama database
});

// Menghubungkan ke database dan menangani error jika ada
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected!"); // Log jika koneksi berhasil
});

// Endpoint untuk mendaftarkan QR Code
app.post("/register", (req, res) => {
  const id = uuidv4(); // Membuat UUID baru
  const qrCodeUrl = `https://jagoantekno.com/#features`; // URL QR Code

  const query = "INSERT INTO qrcodes (id, qrCodeUrl) VALUES (?, ?)"; // Query SQL untuk menyimpan QR Code
  db.query(query, [id, qrCodeUrl], (err, result) => {
    if (err) throw err; // Tangani error jika ada

    QRCode.toDataURL(qrCodeUrl, (err, url) => {
      if (err) throw err; // Tangani error jika ada
      res.json({ qrCodeUrl: url }); // Kirim URL QR Code sebagai respons
    });
  });
});

// Endpoint untuk memvalidasi QR Code
app.post("/validate", (req, res) => {
  const { qrCodeUrl } = req.body; // Ambil URL QR Code dari request body

  const querySelect = "SELECT * FROM qrcodes WHERE qrCodeUrl = ?"; // Query SQL untuk mencari QR Code
  const queryUpdate = "UPDATE qrcodes SET status = ? WHERE qrCodeUrl = ?"; // Query SQL untuk memperbarui status QR Code

  db.query(querySelect, [qrCodeUrl], (err, results) => {
    if (err) throw err; // Tangani error jika ada

    if (results.length > 0) {
      // Jika QR Code ditemukan
      const qrCode = results[0];
      if (qrCode.status === "active") {
        // Jika status QR Code adalah "active"
        // Ubah status menjadi "used"
        db.query(queryUpdate, ["used", qrCodeUrl], (err, result) => {
          if (err) throw err; // Tangani error jika ada
          res.json({ valid: true }); // Kirim respons valid
        });
      } else {
        res.json({ valid: false, message: "QR Code has already been used" }); // Kirim pesan bahwa QR Code sudah digunakan
      }
    } else {
      res.json({ valid: false, message: "QR Code not found" }); // Kirim pesan bahwa QR Code tidak ditemukan
    }
  });
});

// Memulai server di port 5000
app.listen(5000, () => {
  console.log("Server started on port 5000"); // Log jika server berhasil dimulai
});
