import Database from 'better-sqlite3';

const db = new Database('server/database.sqlite');

try {
  console.log("Memulai proses pembersihan database...");
  db.prepare('DELETE FROM serial_numbers').run();
  db.prepare('DELETE FROM items').run();
  db.prepare('DELETE FROM brands').run();
  db.prepare('DELETE FROM categories').run();
  db.prepare('DELETE FROM wms_asset_models').run();
  
  // Reset sqlite_sequence to restart IDs from 1
  db.prepare("DELETE FROM sqlite_sequence WHERE name IN ('serial_numbers', 'items', 'brands', 'categories', 'wms_asset_models')").run();
  
  console.log("✅ Database berhasil dibersihkan! Semua data kembali kosong.");
} catch (error) {
  console.error("❌ Gagal membersihkan database:", error.message);
}
