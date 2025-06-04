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

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-6">
        Daftar Tugas
      </h2>
      <div className="bg-white rounded-xl shadow-sm p-6 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-orange-100">
            <tr>
              <th className="p-3 text-left font-semibold">Mata Kuliah</th>
              <th className="p-3 text-left font-semibold">Judul</th>
              <th className="p-3 text-left font-semibold">Tenggat</th>
              <th className="p-3 text-left font-semibold">Status</th>
              <th className="p-3 text-left font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {tugas.map((t: any) => (
              <tr key={t.id} className="hover:bg-orange-50">
                <td className="p-3">{t.mata_kuliah?.nama || '-'}</td>
                <td className="p-3">{t.judul}</td>
                <td className="p-3">{t.tenggat}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      t.status === "selesai"
                        ? "bg-green-100 text-green-800"
                        : t.status === "proses"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleEdit(t)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <MdEdit className="inline-block" />
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="text-red-600 hover:text-red-800 ml-2"
                  >
                    <MdDelete className="inline-block" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Floating Action Button */}
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
          className="fixed bottom-12 right-12 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110"
        >
          <MdAdd className="text-2xl" />
        </button>

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {editId ? "Edit Tugas" : "Tambah Tugas Baru"}
            </h2>
            <button onClick={() => setShowModal(false)}>
              <MdClose className="text-gray-500 hover:text-gray-700" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mata Kuliah
              </label>
              <select
                value={formData.mata_kuliah_id}
                onChange={(e) =>
                  setFormData({ ...formData, mata_kuliah_id: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
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
              <label className="block text-sm font-medium text-gray-700">
                Judul Tugas
              </label>
              <input
                type="text"
                value={formData.judul}
                onChange={(e) =>
                  setFormData({ ...formData, judul: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Deskripsi
              </label>
              <textarea
                value={formData.deskripsi}
                onChange={(e) =>
                  setFormData({ ...formData, deskripsi: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tenggat
              </label>
              <input
                type="date"
                value={formData.tenggat}
                onChange={(e) =>
                  setFormData({ ...formData, tenggat: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              >
                <option value="belum">Belum</option>
                <option value="proses">Dalam Proses</option>
                <option value="selesai">Selesai</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-all duration-200"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-all duration-200"
              >
                {editId ? "Simpan Perubahan" : "Tambah Tugas"}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}
