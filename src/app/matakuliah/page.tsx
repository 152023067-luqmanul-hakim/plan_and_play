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

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Daftar Mata Kuliah
      </h1>

      <div className="bg-white rounded-xl shadow-sm p-6 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-orange-100">
            <tr>
              <th className="p-3 text-left font-semibold">Kode</th>
              <th className="p-3 text-left font-semibold">Nama Mata Kuliah</th>
              <th className="p-3 text-left font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {mataKuliah.map((mk) => (
              <tr key={mk.id} className="hover:bg-orange-50">
                <td className="p-3">{mk.kode || "-"}</td>
                <td className="p-3">{mk.nama}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(mk)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      title="Edit"
                    >
                      <MdEdit className="text-xl" />
                    </button>
                    <button
                      onClick={() => handleDelete(mk.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
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
          setFormData({ nama: "", kode: "" });
          setShowModal(true);
        }}
        className="fixed bottom-12 right-12 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110"
      >
        <MdAdd className="text-2xl" />
      </button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {editId ? "Edit Mata Kuliah" : "Tambah Mata Kuliah Baru"}
          </h2>
          <button onClick={() => setShowModal(false)}>
            <MdClose className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Kode Mata Kuliah
            </label>
            <input
              type="text"
              value={formData.kode}
              onChange={(e) =>
                setFormData({ ...formData, kode: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nama Mata Kuliah
            </label>
            <input
              type="text"
              value={formData.nama}
              onChange={(e) =>
                setFormData({ ...formData, nama: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
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
              {editId ? "Simpan Perubahan" : "Tambah"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
