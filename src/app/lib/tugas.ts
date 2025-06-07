import { supabase } from "./supabaseCLient";

// Cache untuk data tugas
let tugasCache: any[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 30000; // 30 detik

// Ambil semua tugas dengan caching
export async function getTugas() {
  const now = Date.now();

  // Return cache jika masih valid
  if (tugasCache && now - lastFetchTime < CACHE_DURATION) {
    return tugasCache;
  }

  const { data, error } = await supabase.from("tugas").select(`
      *,
      mata_kuliah:mata_kuliah_id (nama)
    `);
  if (error) throw error;

  // Update cache
  tugasCache = data;
  lastFetchTime = now;

  return data;
}

// Clear cache saat ada perubahan data
const clearCache = () => {
  tugasCache = null;
  lastFetchTime = 0;
};

// Tambah tugas
export async function tambahTugas(payload: {
  mata_kuliah_id?: string;
  judul: string;
  deskripsi?: string;
  tenggat?: string;
  status?: string;
}) {
  const { data, error } = await supabase.from("tugas").insert([payload]);
  if (error) throw error;
  clearCache();
  return data;
}

export async function updateTugas(
  id: string,
  payload: Partial<Omit<Parameters<typeof tambahTugas>[0], "id">>
) {
  const { data, error } = await supabase
    .from("tugas")
    .update(payload)
    .eq("id", id);
  if (error) throw error;
  clearCache();
  return data;
}

// Hapus tugas
export async function deleteTugas(id: string) {
  const { data, error } = await supabase.from("tugas").delete().eq("id", id);
  if (error) throw error;
  clearCache();
  return data;
}
