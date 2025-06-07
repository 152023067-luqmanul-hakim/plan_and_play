"use client";
import {
  getMataKuliah,
  tambahMataKuliah,
  updateMataKuliah,
  hapusMataKuliah,
} from "../lib/mataKuliah";
import { MdAdd, MdClose, MdEdit, MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";

export default function MataKuliahPage() {
  const [showModal, setShowModal] = useState(false);
  const [mataKuliah, setMataKuliah] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nama: "",
    kode: "",
  });

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await getMataKuliah();
      setMataKuliah(data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateMataKuliah(editId, formData);
      } else {
        await tambahMataKuliah(formData);
      }
      setShowModal(false);
      setFormData({ nama: "", kode: "" });
      setEditId(null);
      await fetchData();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleEdit = (data: any) => {
    setEditId(data.id);
    setFormData({
      nama: data.nama,
      kode: data.kode || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus mata kuliah ini?")) {
      try {
        await hapusMataKuliah(id);
        await fetchData();
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
      </div>
    );

  return (
    <div className="space-y-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-orange-600 to-amber-600 bg-clip-text text-transparent mb-4">
          Daftar Mata Kuliah
        </h1>
        <p className="text-gray-600 text-lg">
          Kelola mata kuliah yang kamu ambil
        </p>
      </div>

      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 border border-gray-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-orange-100 to-amber-100">
                <th className="p-6 text-left font-bold text-orange-800 rounded-tl-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🔤</span>
                    Kode
                  </div>
                </th>
                <th className="p-6 text-left font-bold text-orange-800">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📚</span>
                    Nama Mata Kuliah
                  </div>
                </th>
                <th className="p-6 text-left font-bold text-orange-800 rounded-tr-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">⚙️</span>
                    Aksi
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mataKuliah.map((mk) => (
                <tr
                  key={mk.id}
                  className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 transition-all duration-300 group"
                >
                  <td className="p-6 font-mono text-gray-700 group-hover:text-orange-700 transition-colors duration-300">
                    {mk.kode || "-"}
                  </td>
                  <td className="p-6 font-semibold text-gray-800 group-hover:text-orange-800 transition-colors duration-300">
                    {mk.nama}
                  </td>
                  <td className="p-6">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(mk)}
                        className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:scale-110 shadow-sm"
                        title="Ubah"
                      >
                        <MdEdit className="text-xl" />
                      </button>
                      <button
                        onClick={() => handleDelete(mk.id)}
                        className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-110 shadow-sm"
                        title="Hapus"
                      >
                        <MdDelete className="text-xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={() => {
          setEditId(null);
          setFormData({ nama: "", kode: "" });
          setShowModal(true);
        }}
        className="fixed bottom-12 right-12 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-full p-6 shadow-2xl transition-all duration-300 hover:scale-110 hover:rotate-90 border-4 border-white"
      >
        <MdAdd className="text-3xl" />
      </button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-2xl border border-gray-200/50">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-orange-600 bg-clip-text text-transparent">
              {editId ? "Ubah Mata Kuliah" : "Tambah Mata Kuliah Baru"}
            </h2>
            <button
              onClick={() => setShowModal(false)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
            >
              <MdClose className="text-gray-500 hover:text-gray-700 text-xl" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Kode Mata Kuliah
              </label>
              <input
                type="text"
                value={formData.kode}
                onChange={(e) =>
                  setFormData({ ...formData, kode: e.target.value })
                }
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 font-mono"
                placeholder="Contoh: CS101"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Nama Mata Kuliah
              </label>
              <input
                type="text"
                value={formData.nama}
                onChange={(e) =>
                  setFormData({ ...formData, nama: e.target.value })
                }
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
                placeholder="Masukkan nama mata kuliah..."
                required
              />
            </div>
            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-3 text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-200 font-medium shadow-lg"
              >
                {editId ? "Simpan Perubahan" : "Tambah"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
