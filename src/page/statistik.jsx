import React from "react";

export default function Statistik() {
  return (
    <div className="p-4 md:p-8 bg-[#f6fff7] min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-green-700 mb-1">Statistik & Analisis Lingkungan</h1>
        <p className="text-green-700 text-sm">Pantau dampak positif aktivitas daur ulang Anda terhadap lingkungan</p>
      </div>

      {/* Statistik Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Sampah Diklasifikasi */}
        <div className="bg-white rounded-xl shadow p-6 border border-green-100">
          <h2 className="text-lg font-semibold text-green-700 mb-2">Total Sampah Diklasifikasi</h2>
          <div className="text-4xl font-bold text-green-700 mb-2">1,284</div>
          <ul className="text-sm text-gray-700 space-y-1">
            <li><span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>Organik <span className="float-right">45 <span className="text-gray-400">35%</span></span></li>
            <li><span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>Plastik <span className="float-right">32 <span className="text-gray-400">25%</span></span></li>
            <li><span className="inline-block w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>Kertas <span className="float-right">28 <span className="text-gray-400">22%</span></span></li>
            <li><span className="inline-block w-2 h-2 bg-teal-400 rounded-full mr-2"></span>Kaca <span className="float-right">15 <span className="text-gray-400">12%</span></span></li>
            <li><span className="inline-block w-2 h-2 bg-red-400 rounded-full mr-2"></span>Elektronik <span className="float-right">8 <span className="text-gray-400">6%</span></span></li>
          </ul>
        </div>
        {/* Dampak Lingkungan */}
        <div className="bg-white rounded-xl shadow p-6 border border-green-100">
          <h2 className="text-lg font-semibold text-green-700 mb-2">Dampak Lingkungan</h2>
          <div className="mb-2">CO₂ Dikurangi <span className="float-right font-bold">156 kg</span></div>
          <div className="w-full h-2 bg-green-100 rounded mb-2"><div className="h-2 bg-green-500 rounded" style={{width:'78%'}}></div></div>
          <div className="text-xs text-gray-500 mb-2">Target: 200 kg/bulan</div>
          <div className="mb-2">Air Dihemat <span className="float-right font-bold">1,240 L</span></div>
          <div className="w-full h-2 bg-green-100 rounded mb-2"><div className="h-2 bg-blue-400 rounded" style={{width:'62%'}}></div></div>
          <div className="text-xs text-gray-500 mb-2">Target: 2,000 L/bulan</div>
          <div className="mb-2">Energi Dihemat <span className="float-right font-bold">450 kWh</span></div>
          <div className="w-full h-2 bg-green-100 rounded mb-2"><div className="h-2 bg-yellow-400 rounded" style={{width:'90%'}}></div></div>
          <div className="text-xs text-gray-500 mb-2">Target: 500 kWh/bulan</div>
          <div className="mt-4 text-green-700 font-semibold text-sm text-center">Setara dengan <span className="font-bold">12 pohon ditanam</span></div>
        </div>
        {/* Pencapaian & Badge */}
        <div className="bg-white rounded-xl shadow p-6 border border-green-100">
          <h2 className="text-lg font-semibold text-green-700 mb-2">Pencapaian & Badge</h2>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-yellow-50 rounded p-2 flex flex-col items-center"><span className="text-yellow-400 text-2xl mb-1">🏆</span><span className="text-xs font-semibold">Eco Master</span><span className="text-[10px] text-gray-500">1000+ klasifikasi</span></div>
            <div className="bg-green-50 rounded p-2 flex flex-col items-center"><span className="text-green-400 text-2xl mb-1">♻️</span><span className="text-xs font-semibold">Recycling Pro</span><span className="text-[10px] text-gray-500">500+ item didaur ulang</span></div>
            <div className="bg-blue-50 rounded p-2 flex flex-col items-center"><span className="text-blue-400 text-2xl mb-1">📘</span><span className="text-xs font-semibold">Knowledge Seeker</span><span className="text-[10px] text-gray-500">25+ modul selesai</span></div>
            <div className="bg-purple-50 rounded p-2 flex flex-col items-center"><span className="text-purple-400 text-2xl mb-1">👥</span><span className="text-xs font-semibold">Community Leader</span><span className="text-[10px] text-gray-500">50+ referral</span></div>
          </div>
          <div className="text-xs text-gray-700 mb-1">Progress ke level berikutnya <span className="float-right">Level 6</span></div>
          <div className="w-full h-2 bg-green-100 rounded mb-2"><div className="h-2 bg-green-500 rounded" style={{width:'75%'}}></div></div>
          <div className="text-xs text-gray-500">750/1000 poin untuk level 7</div>
        </div>
      </div>

      {/* Tren Aktivitas Mingguan */}
      <div className="bg-white rounded-xl shadow p-6 border border-green-100 mb-8">
        <h2 className="text-lg font-semibold text-green-700 mb-2">Tren Aktivitas Mingguan</h2>
        <div className="flex flex-col items-center justify-center h-40 text-green-400">
          <span className="text-4xl mb-2">📈</span>
          <div className="text-sm text-green-700 mb-2">Grafik Interaktif</div>
          <div className="text-xs text-gray-500 mb-2 text-center">Menampilkan tren klasifikasi, daur ulang, dan dampak lingkungan</div>
          <button className="btn btn-success btn-sm">Lihat Detail Analisis</button>
        </div>
      </div>

      {/* Perbandingan Bulanan & Leaderboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Perbandingan Bulanan */}
        <div className="bg-white rounded-xl shadow p-6 border border-green-100">
          <h2 className="text-lg font-semibold text-green-700 mb-2">Perbandingan Bulanan</h2>
          <div className="mb-2 flex justify-between"><span>Bulan Ini</span><span className="font-bold">1,284 klasifikasi</span></div>
          <div className="mb-2 flex justify-between"><span>Daur Ulang</span><span className="font-bold">892 item</span></div>
          <div className="mb-2 flex justify-between"><span>Poin Earned</span><span className="font-bold">12,470 poin</span></div>
          <div className="mt-2 text-xs text-green-700">+15% vs bulan lalu</div>
          <div className="mt-1 text-xs text-blue-700">+22% vs bulan lalu</div>
          <div className="mt-1 text-xs text-yellow-700">+8% vs bulan lalu</div>
        </div>
        {/* Leaderboard Komunitas */}
        <div className="bg-white rounded-xl shadow p-6 border border-green-100">
          <h2 className="text-lg font-semibold text-green-700 mb-2">Leaderboard Komunitas</h2>
          <ol className="list-decimal ml-4 text-gray-700">
            <li><span className="font-bold text-green-700">EcoWarrior123</span> <span className="text-xs">🥇 15,420 poin</span></li>
            <li><span className="font-bold text-blue-700">GreenHero</span> <span className="text-xs">🥈 14,890 poin</span></li>
            <li><span className="font-bold text-yellow-700">RecycleKing</span> <span className="text-xs">🥉 13,750 poin</span></li>
            <li>Anda <span className="text-xs">12,470 poin</span></li>
          </ol>
        </div>
      </div>
    </div>
  );
}
