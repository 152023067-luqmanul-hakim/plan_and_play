"use client";
import {
  getJadwalMataKuliah,
  tambahJadwalMataKuliah,
  updateJadwalMataKuliah,
  deleteJadwalMataKuliah,
} from "../lib/jadwalMataKuliah";
import { getMataKuliah } from "../lib/mataKuliah";
import { MdAdd, MdClose, MdEdit, MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";

export default function JadwalPage() {
  const [showModal, setShowModal] = useState(false);
  const [jadwal, setJadwal] = useState<any[]>([]);
  const [mataKuliah, setMataKuliah] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    mata_kuliah_id: "",
    hari: "",
    jam_mulai: "",
    jam_selesai: "",
    ruangan: "",
  });

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [jadwalData, mataKuliahData] = await Promise.all([
        getJadwalMataKuliah(),
        getMataKuliah(),
      ]);
      setJadwal(jadwalData || []);
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
        // Update
        await updateJadwalMataKuliah(editId, formData);
      } else {
        // Create
        await tambahJadwalMataKuliah({
          ...formData,
        });
      }
      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleEdit = (data: any) => {
    setEditId(data.id);
    setFormData({
      mata_kuliah_id: data.mata_kuliah_id,
      hari: data.hari,
      jam_mulai: data.jam_mulai,
      jam_selesai: data.jam_selesai,
      ruangan: data.ruangan,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus jadwal ini?")) {
      try {
        await deleteJadwalMataKuliah(id);
        fetchData();
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Jadwal Mata Kuliah
      </h1>
      <div className="bg-white rounded-xl shadow-sm p-6 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-orange-100">
            <tr>
              <th className="p-3 text-left font-semibold">Mata Kuliah</th>
              <th className="p-3 text-left font-semibold">Hari</th>
              <th className="p-3 text-left font-semibold">Jam Mulai</th>
              <th className="p-3 text-left font-semibold">Jam Selesai</th>
              <th className="p-3 text-left font-semibold">Ruangan</th>
              <th className="p-3 text-left font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {jadwal.map((j: any) => (
              <tr key={j.id} className="hover:bg-orange-50">
                <td className="p-3">{j.mata_kuliah?.nama || "-"}</td>
                <td className="p-3">{j.hari}</td>
                <td className="p-3">{j.jam_mulai}</td>
                <td className="p-3">{j.jam_selesai}</td>
                <td className="p-3">{j.ruangan}</td>
                <td className="p-3">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(j)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <MdEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(j.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <MdDelete />
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
            hari: "",
            jam_mulai: "",
            jam_selesai: "",
            ruangan: "",
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
            {editId ? "Edit Jadwal" : "Tambah Jadwal Baru"}
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
              Hari
            </label>
            <select
              value={formData.hari}
              onChange={(e) =>
                setFormData({ ...formData, hari: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            >
              <option value="">Pilih Hari</option>
              {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"].map(
                (hari) => (
                  <option key={hari} value={hari}>
                    {hari}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Jam Mulai
              </label>
              <input
                type="time"
                value={formData.jam_mulai}
                onChange={(e) =>
                  setFormData({ ...formData, jam_mulai: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Jam Selesai
              </label>
              <input
                type="time"
                value={formData.jam_selesai}
                onChange={(e) =>
                  setFormData({ ...formData, jam_selesai: e.target.value })
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ruangan
            </label>
            <input
              type="text"
              value={formData.ruangan}
              onChange={(e) =>
                setFormData({ ...formData, ruangan: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-all duration-200"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-all duration-200"
            >
              {editId ? "Perbarui Jadwal" : "Simpan Jadwal"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
