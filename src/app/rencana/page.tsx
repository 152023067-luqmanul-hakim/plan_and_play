"use client";
import {
  getRencana,
  tambahRencana,
  deleteRencana,
  updateRencana,
} from "../lib/rencana";
import { MdAdd, MdClose, MdEdit, MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";

export default function RencanaPage() {
  const [showModal, setShowModal] = useState(false);
  const [rencana, setRencana] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
    tanggal: "",
  });
  const [editId, setEditId] = useState<string | null>(null);

  const fetchRencana = async () => {
    try {
      setIsLoading(true);
      const data = await getRencana();
      setRencana(data || []);
    } catch (error) {
      console.error("Error fetching rencana:", error);
      setRencana([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch rencana data when component mounts
  useEffect(() => {
    fetchRencana();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        // Mode Edit
        await updateRencana(editId, formData);
      } else {
        // Mode Tambah
        await tambahRencana(formData);
      }
      setShowModal(false);
      setFormData({ judul: "", deskripsi: "", tanggal: "" });
      setEditId(null);
      // Fetch data baru setelah menambah atau mengedit rencana
      await fetchRencana();
    } catch (error) {
      console.error("Error saving rencana:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah anda yakin ingin menghapus rencana ini?")) {
      try {
        await deleteRencana(id);
        await fetchRencana();
      } catch (error) {
        console.error("Error deleting rencana:", error);
      }
    }
  };

  const handleEdit = (rencana: any) => {
    setEditId(rencana.id);
    setFormData({
      judul: rencana.judul,
      deskripsi: rencana.deskripsi,
      tanggal: rencana.tanggal,
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditId(null);
    setFormData({ judul: "", deskripsi: "", tanggal: "" });
    setShowModal(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-full">
      <div className="space-y-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-orange-600 to-amber-600 bg-clip-text text-transparent mb-4">
            Daftar Rencana
          </h1>
          <p className="text-gray-600 text-lg">
            Atur dan pantau rencana masa depanmu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {Array.isArray(rencana) &&
            rencana.map((r) =>
              r && r.id ? (
                <div
                  key={r.id}
                  className="group relative bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50 hover:scale-105 hover:-translate-y-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-amber-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="flex justify-between items-start gap-4 mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">🎯</span>
                          <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                            {r.judul || "Tanpa Judul"}
                          </h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed line-clamp-3">
                          {r.deskripsi || "Belum ada deskripsi"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-200/50">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">📅</span>
                        <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-2 rounded-lg">
                          {r.tanggal || "Belum ditentukan"}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(r)}
                          className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:scale-110 shadow-sm"
                          title="Ubah"
                        >
                          <MdEdit className="text-xl" />
                        </button>
                        <button
                          onClick={() => handleDelete(r.id)}
                          className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-110 shadow-sm"
                          title="Hapus"
                        >
                          <MdDelete className="text-xl" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null
            )}
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={handleAdd}
        className="fixed bottom-12 right-12 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-full p-6 shadow-2xl transition-all duration-300 hover:scale-110 hover:rotate-90 border-4 border-white"
      >
        <MdAdd className="text-3xl" />
      </button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-2xl border border-gray-200/50">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-orange-600 bg-clip-text text-transparent">
              {editId ? "Ubah Rencana" : "Tambah Rencana Baru"}
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
                Judul Rencana
              </label>
              <input
                type="text"
                value={formData.judul}
                onChange={(e) =>
                  setFormData({ ...formData, judul: e.target.value })
                }
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
                placeholder="Masukkan judul rencana..."
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
                placeholder="Jelaskan rencana Anda..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Tanggal Target
              </label>
              <input
                type="date"
                value={formData.tanggal}
                onChange={(e) =>
                  setFormData({ ...formData, tanggal: e.target.value })
                }
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
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
                Simpan
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
