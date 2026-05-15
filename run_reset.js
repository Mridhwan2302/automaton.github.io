import db from './server/database.js';

try {
  // Reset semua counter barang menjadi 0
  db.prepare('UPDATE items SET last_counter = 0').run();
  
  // Hapus semua serial number yang lama
  db.prepare('DELETE FROM serial_numbers').run();
  
  // Reset sqlite_sequence
  db.prepare("DELETE FROM sqlite_sequence WHERE name = 'serial_numbers'").run();

  // PAKSA SIMPAN KE DISK SEKARANG!
  db.forceSave();

  console.log("✅ SUKSES! Semua Counter Barang telah di-reset ke 0.");
  console.log("✅ SUKSES! Semua data Serial Number yang nyangkut telah dibersihkan.");
  
  // Biarkan Node.js tertutup secara natural tanpa process.exit()
  // untuk mencegah error UV_HANDLE_CLOSING di Windows
} catch (error) {
  console.error("❌ Gagal mereset:", error.message);
}
