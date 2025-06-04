import { supabase } from "./supabaseCLient";

// Ambil semua mata kuliah
export async function getMataKuliah() {
  const { data, error } = await supabase.from("mata_kuliah").select("*");
  if (error) throw error;
  return data;
}

// Tambah mata kuliah
export async function tambahMataKuliah(payload: {
  nama: string;
  kode?: string;
}) {
  const { data, error } = await supabase.from("mata_kuliah").insert([payload]);
  if (error) throw error;
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
  return data;
}

// Hapus mata kuliah
export async function hapusMataKuliah(id: string) {
  const { data, error } = await supabase
    .from("mata_kuliah")
    .delete()
    .eq("id", id);
  if (error) throw error;
  return data;
}
