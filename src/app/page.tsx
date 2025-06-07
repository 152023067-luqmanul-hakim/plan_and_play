import { getTugas } from "./lib/tugas";
import { getMataKuliah } from "./lib/mataKuliah";
import { getRencana } from "./lib/rencana";
import { getJadwalMataKuliah } from "./lib/jadwalMataKuliah";
import {
  MdAssignment,
  MdSchool,
  MdEventNote,
  MdSchedule,
} from "react-icons/md";

export default async function Home() {
  const [tugas, mataKuliah, rencana, jadwalMataKuliah] = await Promise.all([
    getTugas(),
    getMataKuliah(),
    getRencana(),
    getJadwalMataKuliah(),
  ]);

  return (
    <div className="space-y-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-orange-600 to-amber-600 bg-clip-text text-transparent mb-4">
          Dashboard 
        </h1>
        <p className="text-gray-600 text-lg">
          Buat dirimu lebih terorganisir dengan rencana studi dan jadwal
          kegiatan
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="group relative bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-orange-200/50 hover:scale-105 hover:-translate-y-2">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-amber-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-orange-800">Total Tugas</h2>
              <div className="p-3 bg-orange-200 rounded-xl">
                <MdAssignment className="text-3xl text-orange-600" />
              </div>
            </div>
            <p className="text-4xl font-bold text-orange-600 mb-2">
              {tugas.length}
            </p>
            <p className="text-orange-700 text-sm">
              Tugas yang harus dikerjakan
            </p>
          </div>
        </div>

        <div className="group relative bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-blue-200/50 hover:scale-105 hover:-translate-y-2">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-sky-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-blue-800">Mata Kuliah</h2>
              <div className="p-3 bg-blue-200 rounded-xl">
                <MdSchool className="text-3xl text-blue-600" />
              </div>
            </div>
            <p className="text-4xl font-bold text-blue-600 mb-2">
              {mataKuliah.length}
            </p>
            <p className="text-blue-700 text-sm">Mata kuliah terdaftar</p>
          </div>
        </div>

        <div className="group relative bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-green-200/50 hover:scale-105 hover:-translate-y-2">
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-emerald-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-green-800">Rencana</h2>
              <div className="p-3 bg-green-200 rounded-xl">
                <MdEventNote className="text-3xl text-green-600" />
              </div>
            </div>
            <p className="text-4xl font-bold text-green-600 mb-2">
              {rencana.length}
            </p>
            <p className="text-green-700 text-sm">Rencana kegiatan</p>
          </div>
        </div>

        <div className="group relative bg-gradient-to-br from-purple-50 to-violet-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-purple-200/50 hover:scale-105 hover:-translate-y-2">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-violet-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-purple-800">
                Jadwal Kuliah
              </h2>
              <div className="p-3 bg-purple-200 rounded-xl">
                <MdSchedule className="text-3xl text-purple-600" />
              </div>
            </div>
            <p className="text-4xl font-bold text-purple-600 mb-2">
              {jadwalMataKuliah.length}
            </p>
            <p className="text-purple-700 text-sm">Jadwal mingguan</p>
          </div>
        </div>
      </div>
    </div>
  );
}
