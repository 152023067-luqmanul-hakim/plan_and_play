import { supabase } from "./supabaseCLient";

// Cache untuk data mata kuliah
let mataKuliahCache: any[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 30000; // 30 detik

// Ambil semua mata kuliah dengan caching
export async function getMataKuliah() {
  const now = Date.now();

  // Return cache jika masih valid
  if (mataKuliahCache && now - lastFetchTime < CACHE_DURATION) {
    return mataKuliahCache;
  }

  const { data, error } = await supabase.from("mata_kuliah").select("*");
  if (error) throw error;

  // Update cache
  mataKuliahCache = data;
  lastFetchTime = now;

  return data;
}

// Clear cache saat ada perubahan data
const clearCache = () => {
  mataKuliahCache = null;
  lastFetchTime = 0;
};

// Tambah mata kuliah
export async function tambahMataKuliah(payload: {
  nama: string;
  kode?: string;
}) {
  const { data, error } = await supabase.from("mata_kuliah").insert([payload]);
  if (error) throw error;
  clearCache();
  return data;
}

// Update mata kuliah
export async function updateMataKuliah(
  id: string,
  payload: Partial<{ nama: string; kode?: string }>
) {
  const { data, error } = await supabase
    .from("mata_kuliah")
    .update(payload)
    .eq("id", id);
  if (error) throw error;
  clearCache();
  return data;
}

// Hapus mata kuliah
export async function hapusMataKuliah(id: string) {
  const { data, error } = await supabase
    .from("mata_kuliah")
    .delete()
    .eq("id", id);
  if (error) throw error;
  clearCache();
  return data;
}
