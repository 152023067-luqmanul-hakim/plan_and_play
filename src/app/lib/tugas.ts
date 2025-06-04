import { supabase } from "./supabaseCLient";

// Ambil semua tugas
export async function getTugas() {
  const { data, error } = await supabase.from("tugas").select(`
      *,
      mata_kuliah:mata_kuliah_id (nama)
    `);
  if (error) throw error;
  return data;
}

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
  return data;
}

// Hapus tugas
export async function deleteTugas(id: string) {
  const { data, error } = await supabase.from("tugas").delete().eq("id", id);
  if (error) throw error;
  return data;
}
