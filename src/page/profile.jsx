import React, { useState } from 'react';
import { UserIcon } from 'lucide-react';

export default function ProfileSettings() {
  const [nama, setNama] = useState('Eco Warrior');
  const [email, setEmail] = useState('eco@sortify.com');
  const [lokasi, setLokasi] = useState('Jakarta, Indonesia');
  const [tingkatAkurasiMinimum, setTingkatAkurasiMinimum] = useState('95%');
  const [bahasa, setBahasa] = useState('Bahasa Indonesia');
  const [autoSaveHasil, setAutoSaveHasil] = useState(false);
  const [suaraNotifikasi, setSuaraNotifikasi] = useState(true);
  const [notifikasiEmail, setNotifikasiEmail] = useState(true);
  const [reminderHarian, setReminderHarian] = useState(true);
  const [updateStatistik, setUpdateStatistik] = useState(false);
  const [tipsDaurUlang, setTipsDaurUlang] = useState(true);
  const [pencapaianBaru, setPencapaianBaru] = useState(true);


  return (
    <div className="p-4 bg-green-100 min-h-screen ">
      <h1 className="text-xl font-bold text-green-700 mb-6">Pengaturan</h1>
      <p className="text-gray-600 mb-8">Kelola preferensi dan pengaturan akun Anda</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profil Pengguna */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-green-200">
          <h2 className="text-lg font-semibold text-green-700 mb-4">Profil Pengguna</h2>
          <div className="flex items-center mb-4 ">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <UserIcon className="w-8 h-8 text-green-700" />
            </div>
            <div>
              <p className="font-bold">{nama}</p>
              <p className="text-sm text-gray-600">Level 5 • 12.470 poin</p>
            </div>
          </div>
          <button className="btn btn-outline btn-success btn-sm mb-6">Ganti Foto</button>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
            <input
              type="text"
              value={lokasi}
              onChange={(e) => setLokasi(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <button className="btn btn-success">Simpan Perubahan</button>
        </div>

        {/* Notifikasi */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-green-200 ">
          <h2 className="text-lg font-semibold text-green-700 mb-4">Notifikasi</h2>
          <div className="flex justify-between items-center mb-3">
            <span>Notifikasi Email</span>
            <input
              type="checkbox"
              className="toggle toggle-success"
              checked={notifikasiEmail}
              onChange={(e) => setNotifikasiEmail(e.target.checked)}
            />
          </div>
          <div className="flex justify-between items-center mb-3">
            <span>Reminder Harian</span>
            <input
              type="checkbox"
              className="toggle toggle-success"
              checked={reminderHarian}
              onChange={(e) => setReminderHarian(e.target.checked)}
            />
          </div>
          <div className="flex justify-between items-center mb-3">
            <span>Update Statistik</span>
            <input
              type="checkbox"
              className="toggle toggle-success"
              checked={updateStatistik}
              onChange={(e) => setUpdateStatistik(e.target.checked)}
            />
          </div>
          <div className="flex justify-between items-center mb-3">
            <span>Tips Daur Ulang</span>
            <input
              type="checkbox"
              className="toggle toggle-success"
              checked={tipsDaurUlang}
              onChange={(e) => setTipsDaurUlang(e.target.checked)}
            />
          </div>
          <div className="flex justify-between items-center">
            <span>Pencapaian Baru</span>
            <input
              type="checkbox"
              className="toggle toggle-success"
              checked={pencapaianBaru}
              onChange={(e) => setPencapaianBaru(e.target.checked)}
            />
          </div>
        </div>

        {/* Preferensi Klasifikasi */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-green-200 col-span-1 md:col-span-2">
          <h2 className="text-lg font-semibold text-green-700 mb-4">Preferensi Klasifikasi</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tingkat Akurasi Minimum</label>
            <select
              value={tingkatAkurasiMinimum}
              onChange={(e) => setTingkatAkurasiMinimum(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            >
              <option>90%</option>
              <option>95%</option>
              <option>99%</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Bahasa</label>
            <select
              value={bahasa}
              onChange={(e) => setBahasa(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            >
              <option>Bahasa Indonesia</option>
              <option>English</option>
            </select>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span>Auto-save Hasil</span>
            <input
              type="checkbox"
              className="toggle toggle-success"
              checked={autoSaveHasil}
              onChange={(e) => setAutoSaveHasil(e.target.checked)}
            />
          </div>
          <div className="flex justify-between items-center">
            <span>Suara Notifikasi</span>
            <input
              type="checkbox"
              className="toggle toggle-success"
              checked={suaraNotifikasi}
              onChange={(e) => setSuaraNotifikasi(e.target.checked)}
            />
          </div>
        </div>

        {/* Data & Privasi */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-green-200 col-span-1 md:col-span-2">
          <h2 className="text-lg font-semibold text-green-700 mb-4">Data & Privasi</h2>
          <button className="btn btn-outline w-full mb-3 border-green-500 text-green-700 hover:bg-green-50 hover:border-green-600">Export Data Saya</button>
          <button className="btn btn-outline w-full mb-3 border-green-500 text-green-700 hover:bg-green-50 hover:border-green-600">Hapus Riwayat Klasifikasi</button>
          <button className="btn btn-outline w-full mb-3 border-yellow-500 text-yellow-700 hover:bg-yellow-50 hover:border-yellow-600">Reset Statistik</button>
          <button className="btn btn-outline w-full border-red-500 text-red-700 hover:bg-red-50 hover:border-red-600">Hapus Akun</button>
          <p className="text-sm text-gray-500 mt-6">
            Kebijakan Privasi
            <br />
            Data Anda aman dan hanya digunakan untuk meningkatkan pengalaman Sortify. Kami tidak membagikan informasi pribadi kepada pihak ketiga.
          </p>
        </div>
      </div>
    </div>
  );
}