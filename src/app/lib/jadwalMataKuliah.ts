import { supabase } from "./supabaseCLient";

// Ambil semua jadwal mata kuliah
export async function getJadwalMataKuliah() {
  const { data, error } = await supabase.from("jadwal_mata_kuliah").select(`
      *,
      mata_kuliah:mata_kuliah_id(nama)
    `);
  if (error) throw error;
  return data;
}

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
  return data;
}

// Hapus jadwal mata kuliah
export async function deleteJadwalMataKuliah(id: string) {
  const { data, error } = await supabase
    .from("jadwal_mata_kuliah")
    .delete()
    .eq("id", id);
  if (error) throw error;
  return data;
}
