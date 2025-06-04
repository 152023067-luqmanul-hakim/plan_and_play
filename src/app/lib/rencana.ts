import { supabase } from "./supabaseCLient";

// Ambil semua rencana
export async function getRencana() {
  const { data, error } = await supabase.from("rencana").select("*");
  if (error) throw error;
  return data;
}

// Tambah rencana
export async function tambahRencana(payload: {
  judul: string;
  deskripsi?: string;
  tanggal?: string;
}) {
  const { data, error } = await supabase.from("rencana").insert([payload]);
  if (error) throw error;
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
  return data;
}

// Hapus rencana
export async function deleteRencana(id: string) {
  const { data, error } = await supabase.from("rencana").delete().eq("id", id);
  if (error) throw error;
  return data;
}
