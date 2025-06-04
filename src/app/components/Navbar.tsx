import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="h-full w-full bg-orange-400 text-white flex flex-col gap-6 py-8 px-6 shadow-lg rounded-2xl">
      <h2 className="text-3xl font-bold border-b pb-4">Plan & Play</h2>
      <Link
        href="/"
        className="hover:bg-white hover:text-orange-500 p-3 font-bold text-lg rounded-lg transition-all duration-200 hover:translate-x-2"
      >
        Dashboard
      </Link>
      <Link
        href="/matakuliah"
        className="hover:bg-white hover:text-orange-500 p-3 font-bold text-lg rounded-lg transition-all duration-200 hover:translate-x-2"
      >
        Mata Kuliah
      </Link>
      <Link
        href="/jadwal"
        className="hover:bg-white hover:text-orange-500 p-3 font-bold text-lg rounded-lg transition-all duration-200 hover:translate-x-2"
      >
        Jadwal Mata Kuliah
      </Link>
      <Link
        href="/daftar-tugas"
        className="hover:bg-white hover:text-orange-500 p-3 font-bold text-lg rounded-lg transition-all duration-200 hover:translate-x-2"
      >
        Daftar Tugas
      </Link>
      <Link
        href="/rencana"
        className="hover:bg-white hover:text-orange-500 p-3 font-bold text-lg rounded-lg transition-all duration-200 hover:translate-x-2"
      >
        Rencana
      </Link>
    </nav>
  );
}
