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
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-orange-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Tugas</h2>
            <MdAssignment className="text-2xl text-orange-600" />
          </div>
          <p className="text-3xl font-bold text-orange-600">{tugas.length}</p>
        </div>
        <div className="bg-blue-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Mata Kuliah</h2>
            <MdSchool className="text-2xl text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-600">
            {mataKuliah.length}
          </p>
        </div>
        <div className="bg-green-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Rencana</h2>
            <MdEventNote className="text-2xl text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">{rencana.length}</p>
        </div>
        <div className="bg-purple-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">
              Jadwal Mata Kuliah / Minggu
            </h2>
            <MdSchedule className="text-2xl text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-600">
            {jadwalMataKuliah.length}
          </p>
        </div>
      </div>
    </div>
  );
}
