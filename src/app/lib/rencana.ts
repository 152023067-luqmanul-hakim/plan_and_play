import { supabase } from "./supabaseCLient";

// Cache untuk data rencana
let rencanaCache: any[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 30000; // 30 detik

// Ambil semua rencana dengan caching
export async function getRencana() {
  const now = Date.now();

  // Return cache jika masih valid
  if (rencanaCache && now - lastFetchTime < CACHE_DURATION) {
    return rencanaCache;
  }

  const { data, error } = await supabase.from("rencana").select("*");
  if (error) throw error;

  // Update cache
  rencanaCache = data;
  lastFetchTime = now;

  return data;
}

// Clear cache saat ada perubahan data
const clearCache = () => {
  rencanaCache = null;
  lastFetchTime = 0;
};

// Tambah rencana
export async function tambahRencana(payload: {
  judul: string;
  deskripsi?: string;
  tanggal?: string;
}) {
  const { data, error } = await supabase.from("rencana").insert([payload]);
  if (error) throw error;
  clearCache(); // Clear cache setelah perubahan
  return data;
}

// Update rencana
export async function updateRencana(
  id: string,
  payload: Partial<{ judul: string; deskripsi?: string; tanggal?: string }>
) {
  const { data, error } = await supabase
    .from("rencana")
    .update(payload)
    .eq("id", id);
  if (error) throw error;
  clearCache(); // Clear cache setelah perubahan
  return data;
}

// Hapus rencana
export async function deleteRencana(id: string) {
  const { data, error } = await supabase.from("rencana").delete().eq("id", id);
  if (error) throw error;
  clearCache(); // Clear cache setelah perubahan
  return data;
}
