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
    return <div>Loading...</div>;
  }

  return (
    <div className="relative min-h-full">
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Daftar Rencana
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.isArray(rencana) &&
            rencana.map((r) =>
              r && r.id ? (
                <div
                  key={r.id}
                  className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-all border border-gray-100"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-orange-600 mb-2">
                        {r.judul || "Untitled"}
                      </h3>
                      <p className="text-gray-600 mt-2 line-clamp-3">
                        {r.deskripsi || ""}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                        {r.tanggal || "-"}
                      </span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEdit(r)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Edit"
                        >
                          <MdEdit className="text-xl" />
                        </button>
                        <button
                          onClick={() => handleDelete(r.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
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
        className="fixed bottom-12 right-12 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110"
      >
        <MdAdd className="text-2xl" />
      </button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {editId ? "Edit Rencana" : "Tambah Rencana Baru"}
          </h2>
          <button onClick={() => setShowModal(false)}>
            <MdClose className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Judul
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
              Tanggal
            </label>
            <input
              type="date"
              value={formData.tanggal}
              onChange={(e) =>
                setFormData({ ...formData, tanggal: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600"
            >
              Simpan
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
