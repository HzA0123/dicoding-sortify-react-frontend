import React from 'react';
import { UploadCloudIcon, FolderIcon, CameraIcon } from 'lucide-react';

export default function Classification() {
  // Placeholder data for waste categories
  const wasteCategories = [
    { name: 'Organik', items: 48, percentage: 30, color: 'bg-green-500', placeholderColor: 'bg-green-200' },
    { name: 'Plastik', items: 32, percentage: 25, color: 'bg-blue-500', placeholderColor: 'bg-blue-200' },
    { name: 'Kertas', items: 28, percentage: 22, color: 'bg-yellow-500', placeholderColor: 'bg-yellow-200' },
    { name: 'Kaca', items: 15, percentage: 12, color: 'bg-indigo-500', placeholderColor: 'bg-indigo-200' },
    { name: 'Elektronik', items: 8, percentage: 6, color: 'bg-red-500', placeholderColor: 'bg-red-200' },
  ];

  return (
    <div className="p-8 bg-green-50 min-h-screen"> {/* Added light green background and padding */}
      <h1 className="text-3xl font-bold text-green-800 mb-2">Klasifikasi Sampah AI</h1> {/* Adjusted text size and color */}
      <p className="text-gray-600 mb-8">Upload foto sampah untuk mendapatkan klasifikasi otomatis dan rekomendasi daur ulang yang tepat</p>

      {/* Upload & Klasifikasi Section */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-green-200 mb-8">
        <h2 className="text-xl font-semibold text-green-700 mb-4">Upload & Klasifikasi</h2>
        <p className="text-gray-600 mb-6">Teknologi AI kami dapat mengidentifikasikan berbagai jenis sampah dengan akurasi tinggi</p>

        {/* Drag and Drop Area */}
        <div className="border-2 border-dashed border-green-400 rounded-lg p-10 text-center mb-6 hover:border-green-600 transition-colors duration-200"> {/* Adjusted border color and added hover effect */}
          <UploadCloudIcon className="mx-auto w-16 h-16 text-green-500 mb-4" />
          <p className="text-xl font-semibold text-gray-700 mb-2">Upload Foto Sampah</p>
          <p className="text-gray-500">Drag & drop atau klik untuk memilih file (JPG, PNG, max 5MB)</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          <button className="btn btn-success">
            <FolderIcon className="w-5 h-5 mr-2" /> Pilih File
          </button>
          <button className="btn btn-outline btn-success">
            <CameraIcon className="w-5 h-5 mr-2" /> Buka Kamera
          </button>
        </div>
      </div>

      {/* Kategori Sampah yang Didukung Section */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-green-200">
        <h2 className="text-xl font-semibold text-green-800 mb-6">Kategori Sampah yang Didukung</h2> {/* Adjusted text color and margin */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"> {/* Adjusted grid columns for responsiveness */}
          {wasteCategories.map((category, index) => (
            <div key={index} className="border border-green-200 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer hover:scale-105"> {/* Adjusted border color and added shadow, added hover scale and cursor */}
              <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center ${category.placeholderColor} mb-3`}></div> {/* Placeholder circle with background */}
              <p className="text-lg font-semibold text-gray-800 mb-1">{category.name}</p>
              <p className="text-sm text-gray-600">{category.items} Item</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className={`h-2.5 rounded-full ${category.color}`} style={{ width: `${category.percentage}%` }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">{category.percentage}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}