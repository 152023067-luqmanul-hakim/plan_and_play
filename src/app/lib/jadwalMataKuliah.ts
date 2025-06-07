import { supabase } from "./supabaseCLient";

// Cache untuk data jadwal
let jadwalCache: any[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 30000; // 30 detik

// Ambil semua jadwal mata kuliah dengan caching
export async function getJadwalMataKuliah() {
  const now = Date.now();

  // Return cache jika masih valid
  if (jadwalCache && now - lastFetchTime < CACHE_DURATION) {
    return jadwalCache;
  }

  const { data, error } = await supabase.from("jadwal_mata_kuliah").select(`
      *,
      mata_kuliah:mata_kuliah_id(nama)
    `);
  if (error) throw error;

  // Update cache
  jadwalCache = data;
  lastFetchTime = now;

  return data;
}

// Clear cache saat ada perubahan data
const clearCache = () => {
  jadwalCache = null;
  lastFetchTime = 0;
};

// Tambah jadwal mata kuliah
export async function tambahJadwalMataKuliah(payload: {
  mata_kuliah_id: string;
  hari: string;
  jam_mulai?: string;
  jam_selesai?: string;
  ruangan?: string;
}) {
  const { data, error } = await supabase
    .from("jadwal_mata_kuliah")
    .insert([payload]);
  if (error) throw error;
  clearCache();
  return data;
}

// Update jadwal mata kuliah
export async function updateJadwalMataKuliah(
  id: string,
  payload: Partial<{
    mata_kuliah_id: string;
    hari: string;
    jam_mulai?: string;
    jam_selesai?: string;
    ruangan?: string;
  }>
) {
  const { data, error } = await supabase
    .from("jadwal_mata_kuliah")
    .update(payload)
    .eq("id", id);
  if (error) throw error;
  clearCache();
  return data;
}

// Hapus jadwal mata kuliah
export async function deleteJadwalMataKuliah(id: string) {
  const { data, error } = await supabase
    .from("jadwal_mata_kuliah")
    .delete()
    .eq("id", id);
  if (error) throw error;
  clearCache();
  return data;
}
