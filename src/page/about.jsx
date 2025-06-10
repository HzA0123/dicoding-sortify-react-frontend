import React from "react";

export default function AboutPage() {
  return (
    <div className="p-4 md:p-8 bg-[#f6fff7] min-h-screen">
      {/* Header Section */}
      <div className="rounded-xl bg-gradient-to-r from-green-400 to-blue-400 flex flex-col md:flex-row items-center p-6 md:p-10 mb-8">
        <div className="flex-shrink-0 flex items-center justify-center w-24 h-24 bg-white bg-opacity-30 rounded-full mr-0 md:mr-8 mb-4 md:mb-0">
          <img 
            src="/logo-sortify.png" 
            alt="Sortify Logo" 
            style={{ width: '95%', height: '95%', paddingTop: '15px' }}
            className="object-contain"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Tentang Sortify</h1>
          <p className="text-white text-lg font-medium">
            Platform AI terdepan untuk klasifikasi sampah dan edukasi daur ulang yang membantu menciptakan masa depan yang lebih berkelanjutan
          </p>
        </div>
      </div>

      {/* Misi & Visi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6 border border-green-100">
          <h2 className="flex items-center text-xl font-semibold mb-2 text-green-700">
            <span className="mr-2">🟢</span> Misi Kami
          </h2>
          <p className="text-gray-700">
            Memberdayakan masyarakat Indonesia dengan teknologi AI untuk mengklasifikasi sampah secara akurat, memberikan edukasi daur ulang yang komprehensif, dan menciptakan komunitas eco-warrior yang peduli lingkungan untuk masa depan yang lebih berkelanjutan.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 border border-green-100">
          <h2 className="flex items-center text-xl font-semibold mb-2 text-green-700">
            <span className="mr-2">👁️</span> Visi Kami
          </h2>
          <p className="text-gray-700">
            Menjadi platform teknologi hijau terdepan di Indonesia yang mengubah cara masyarakat memandang dan mengelola sampah, serta menciptakan ekosistem daur ulang yang efisien dan berkelanjutan untuk generasi mendatang.
          </p>
        </div>
      </div>

      {/* Tim Kami */}
      <div className="bg-white rounded-xl shadow p-6 border border-green-100 mb-8">
        <h2 className="text-xl font-semibold mb-2 text-green-700 text-center">Tim Kami</h2>
        <p className="text-gray-700 mb-4 text-center">Para ahli yang berdedikasi untuk masa depan berkelanjutan</p>
        {/* Team members */}
        <div className="flex flex-wrap gap-6 justify-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-green-200 flex items-center justify-center text-2xl font-bold text-green-700 mb-2">H</div>
            <span className="font-medium">Hafid Zayyan Ali</span>
            <span className="text-xs text-gray-500">Front End & Backend Dev</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-green-200 flex items-center justify-center text-2xl font-bold text-green-700 mb-2">F</div>
            <span className="font-medium">Febrian Alif Hermawa</span>
            <span className="text-xs text-gray-500">Front End & Backend Dev</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-green-200 flex items-center justify-center text-2xl font-bold text-green-700 mb-2">R</div>
            <span className="font-medium">Rahma Nabila</span>
            <span className="text-xs text-gray-500">Front End & Backend Dev</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-green-200 flex items-center justify-center text-2xl font-bold text-green-700 mb-2">A</div>
            <span className="font-medium">Arief Fathin Abrar</span>
            <span className="text-xs text-gray-500">ML Engineer</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-green-200 flex items-center justify-center text-2xl font-bold text-green-700 mb-2">G</div>
            <span className="font-medium">Gita Karisma</span>
            <span className="text-xs text-gray-500">ML Engineer</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-green-200 flex items-center justify-center text-2xl font-bold text-green-700 mb-2">H</div>
            <span className="font-medium">Haris Islami Ridha</span>
            <span className="text-xs text-gray-500">ML Engineer</span>
          </div>
        </div>
      </div>
    </div>
  );
}
