"use client";
import { getTugas, tambahTugas, updateTugas, deleteTugas } from "../lib/tugas";
import { getMataKuliah } from "../lib/mataKuliah";
import { MdAdd, MdClose, MdEdit, MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";

export default function DaftarTugas() {
  const [showModal, setShowModal] = useState(false);
  const [tugas, setTugas] = useState<any[]>([]);
  const [mataKuliah, setMataKuliah] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    mata_kuliah_id: "",
    judul: "",
    deskripsi: "",
    tenggat: "",
    status: "belum",
  });

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [tugasData, mataKuliahData] = await Promise.all([
        getTugas(),
        getMataKuliah(),
      ]);
      setTugas(tugasData || []);
      setMataKuliah(mataKuliahData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (editId) {
        // Update tugas
        await updateTugas(editId, formData);
      } else {
        // Tambah tugas
        await tambahTugas(formData);
      }
      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleEdit = (tugasData: any) => {
    setEditId(tugasData.id);
    setFormData({
      mata_kuliah_id: tugasData.mata_kuliah_id,
      judul: tugasData.judul,
      deskripsi: tugasData.deskripsi,
      tenggat: tugasData.tenggat,
      status: tugasData.status,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
      try {
        await deleteTugas(id);
        fetchData();
      } catch (error) {
        console.error("Error deleting tugas:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-orange-600 to-amber-600 bg-clip-text text-transparent mb-4">
          Daftar Tugas
        </h1>
        <p className="text-gray-600 text-lg">Pantau dan kelola tugas-tugasmu</p>
      </div>

      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 border border-gray-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-orange-100 to-amber-100">
                <th className="p-6 text-left font-bold text-orange-800 rounded-tl-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📚</span>
                    Mata Kuliah
                  </div>
                </th>
                <th className="p-6 text-left font-bold text-orange-800">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📝</span>
                    Judul Tugas
                  </div>
                </th>
                <th className="p-6 text-left font-bold text-orange-800">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📅</span>
                    Batas Waktu
                  </div>
                </th>
                <th className="p-6 text-left font-bold text-orange-800">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📊</span>
                    Status
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
              {tugas.map((t: any, index) => (
                <tr
                  key={t.id}
                  className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 transition-all duration-300 group"
                >
                  <td className="p-6 font-semibold text-gray-800 group-hover:text-orange-800 transition-colors duration-300">
                    {t.mata_kuliah?.nama || "-"}
                  </td>
                  <td className="p-6 font-semibold text-gray-800 group-hover:text-orange-800 transition-colors duration-300">
                    {t.judul}
                  </td>
                  <td className="p-6 font-mono text-gray-700 group-hover:text-orange-700 transition-colors duration-300">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📅</span>
                      {t.tenggat}
                    </div>
                  </td>
                  <td className="p-6">
                    <span
                      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                        t.status === "selesai"
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : t.status === "proses"
                          ? "bg-blue-100 text-blue-800 border border-blue-200"
                          : "bg-orange-100 text-orange-800 border border-orange-200"
                      }`}
                    >
                      <span className="mr-2">
                        {t.status === "selesai"
                          ? "✅"
                          : t.status === "proses"
                          ? "⏳"
                          : "⏰"}
                      </span>
                      {t.status === "selesai"
                        ? "Selesai"
                        : t.status === "proses"
                        ? "Sedang Dikerjakan"
                        : "Belum Dikerjakan"}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(t)}
                        className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:scale-110 shadow-sm"
                        title="Ubah"
                      >
                        <MdEdit className="text-xl" />
                      </button>
                      <button
                        onClick={() => handleDelete(t.id)}
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

        <button
          onClick={() => {
            setEditId(null);
            setFormData({
              mata_kuliah_id: "",
              judul: "",
              deskripsi: "",
              tenggat: "",
              status: "belum",
            });
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
                {editId ? "Ubah Tugas" : "Tambah Tugas Baru"}
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
                  Mata Kuliah
                </label>
                <select
                  value={formData.mata_kuliah_id}
                  onChange={(e) =>
                    setFormData({ ...formData, mata_kuliah_id: e.target.value })
                  }
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
                  required
                >
                  <option value="">Pilih Mata Kuliah</option>
                  {mataKuliah.map((mk) => (
                    <option key={mk.id} value={mk.id}>
                      {mk.nama}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Judul Tugas
                </label>
                <input
                  type="text"
                  value={formData.judul}
                  onChange={(e) =>
                    setFormData({ ...formData, judul: e.target.value })
                  }
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
                  placeholder="Masukkan judul tugas..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Deskripsi
                </label>
                <textarea
                  value={formData.deskripsi}
                  onChange={(e) =>
                    setFormData({ ...formData, deskripsi: e.target.value })
                  }
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
                  rows={4}
                  placeholder="Jelaskan detail tugas..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Batas Waktu
                </label>
                <input
                  type="date"
                  value={formData.tenggat}
                  onChange={(e) =>
                    setFormData({ ...formData, tenggat: e.target.value })
                  }
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Status Pengerjaan
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
                  required
                >
                  <option value="belum">⏰ Belum Dikerjakan</option>
                  <option value="proses">⏳ Sedang Dikerjakan</option>
                  <option value="selesai">✅ Selesai</option>
                </select>
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
                  {editId ? "Simpan Perubahan" : "Tambah Tugas"}
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
}
