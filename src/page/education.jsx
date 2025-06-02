import React, { useState } from 'react';
import { StarIcon, BookOpenIcon, VideoIcon, TimerIcon, UsersIcon, HeartIcon } from 'lucide-react';

export default function Education() {
  const [activeTab, setActiveTab] = useState('artikel'); // State untuk melacak tab aktif

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="p-4 bg-green-50 min-h-screen"> {/* Menambahkan background hijau muda */}
      <h1 className="text-xl font-bold text-green-700 mb-2">Pusat Edukasi Daur Ulang</h1>
      <p className="text-gray-600 mb-6">Pelajari berbagai teknik daur ulang melalui artikel mendalam dan video tutorial interaktif</p>

      {/* Navigasi Tab */}
      <div className="flex mb-6 border-b border-gray-200">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'artikel'
              ? 'border-b-2 border-green-600 text-green-700'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => handleTabChange('artikel')}
        >
          Artikel Edukasi
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'video'
              ? 'border-b-2 border-green-600 text-green-700'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => handleTabChange('video')}
        >
          Video Tutorial
        </button>
      </div>

      {/* Konten Tab */}
      <div>
        {activeTab === 'artikel' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Contoh Kartu Artikel (Ulangi div ini untuk setiap kartu artikel) */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-green-200">
              {/* Placeholder Gambar/Thumbnail */}
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>

              <div className="p-4">
                {/* Judul Artikel */}
                <h3 className="font-semibold text-lg text-green-700 mb-2">Panduan Lengkap Memilah Sampah Organik</h3>
                {/* Deskripsi Singkat */}
                <p className="text-gray-600 text-sm mb-4">Pelajari cara memisahkan sampah organik dengan benar untuk kompos yang berkualitas.</p>

                {/* Metadata */}
                <div className="flex items-center justify-between text-gray-500 text-xs mb-4">
                  <span><BookOpenIcon className="inline-block w-4 h-4 mr-1" /> 8 menit baca</span>
                  <span><UsersIcon className="inline-block w-4 h-4 mr-1" /> 1520</span>
                  <span><StarIcon className="inline-block w-4 h-4 mr-1 text-yellow-400" fill="currentColor"/> 4.8</span>
                </div>

                {/* Penulis/Sumber */}
                <div className="flex items-center text-gray-500 text-xs mb-4">
                  <UsersIcon className="inline-block w-4 h-4 mr-1" /> Dr. Sari Lingkungan
                </div>
                 {/* Tanggal */}
                 <div className="flex items-center text-gray-500 text-xs mb-4">
                    <svg className="inline-block w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h.01M7 12h.01M6 16h.01M10 16h.01M14 16h.01M18 16h.01M16 21H5a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v17l-2-1.5V21z" /></svg> 3 hari yang lalu
                 </div>


                {/* Tombol Aksi dan Share/Love Container */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200"> {/* Menambahkan garis di sini */}
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-colors duration-200">
                      Baca Artikel
                  </button>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <span><svg className="inline-block w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 13.563 9.126 13.745 9.393 13.885c.266.14.551.236.845.291.294.055.594.069.893.069c.3 0 .6-.014.894-.069.293-.055.578-.151.844-.291.267-.14.507-.322.709-.543l3.566-3.566c.92-.92 1.023-2.29.236-3.232-.81-.943-2.25-.943-3.06 0l-1.636 1.636a.5.5 0 01-.707 0L9.07 9.07a.5.5 0 010-.707l1.636-1.636c.81-.943 2.25-.943 3.06 0 .787.942.684 2.312-.236 3.232L15.15 13.342c-.202.221-.442.403-.709.543a3.003 3.003 0 01-4.282 0c-.267-.14-.507-.322-.709-.543z" /></svg></span>
                    <span><HeartIcon className="inline-block w-4 h-4" /></span>
                  </div>
                </div>
                {/* Poin */}
                <div className="text-right text-sm font-semibold text-green-600 mt-2">+5 poin</div>
              </div>
            </div>

            {/* Ulangi div kartu di atas untuk kartu artikel lainnya */}
             {/* Contoh Kartu Artikel 2 */}
             <div className="bg-white rounded-lg shadow-md overflow-hidden border border-green-200">
               {/* Placeholder Gambar/Thumbnail */}
               <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                 <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
               </div>
               <div className="p-4">
                 <h3 className="font-semibold text-lg text-green-700 mb-2">Kreasi Unik dari Botol Plastik Bekas</h3>
                 <p className="text-gray-600 text-sm mb-4">Ide kreatif mengubah botol plastik menjadi barang berguna untuk rumah.</p>
                 <div className="flex items-center justify-between text-gray-500 text-xs mb-4">
                   <span><BookOpenIcon className="inline-block w-4 h-4 mr-1" /> 12 menit baca</span>
                   <span><UsersIcon className="inline-block w-4 h-4 mr-1" /> 980</span>
                    <span><StarIcon className="inline-block w-4 h-4 mr-1 text-yellow-400" fill="currentColor"/> 4.6</span>
                 </div>
                  <div className="flex items-center text-gray-500 text-xs mb-4">
                     <UsersIcon className="inline-block w-4 h-4 mr-1" /> Eko Kreatif
                 </div>
                  <div className="flex items-center text-gray-500 text-xs mb-4">
                     <svg className="inline-block w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h.01M7 12h.01M6 16h.01M10 16h.01M14 16h.01M18 16h.01M16 21H5a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v17l-2-1.5V21z" /></svg> 5 hari yang lalu
                  </div>

                 <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                   <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-colors duration-200">
                       Baca Artikel
                   </button>
                   <div className="flex items-center space-x-2 text-gray-500">
                      <span><svg className="inline-block w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 13.563 9.126 13.745 9.393 13.885c.266.14.551.236.845.291.294.055.594.069.893.069c.3 0 .6-.014.894-.069.293-.055.578-.151.844-.291.267-.14.507-.322.709-.543l3.566-3.566c.92-.92 1.023-2.29.236-3.232-.81-.943-2.25-.943-3.06 0l-1.636 1.636a.5.5 0 01-.707 0L9.07 9.07a.5.5 0 010-.707l1.636-1.636c.81-.943 2.25-.943 3.06 0 .787.942.684 2.312-.236 3.232L15.15 13.342c-.202.221-.442.403-.709.543a3.003 3.003 0 01-4.282 0c-.267-.14-.507-.322-.709-.543z" /></svg></span>
                     <span><HeartIcon className="inline-block w-4 h-4" /></span>
                   </div>
                 </div>
                  <div className="text-right text-sm font-semibold text-green-600 mt-2">+5 poin</div>
               </div>
             </div>

          </div>
        )}

        {activeTab === 'video' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Contoh Kartu Video (Ulangi div ini untuk setiap kartu video) */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-green-200">
              {/* Placeholder Gambar/Thumbnail Video */}
              <div className="w-full h-40 bg-gray-300 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.7V15.3a1 1 0 01-1.447.874L15 14m-7 0L.447 17.124A1 1 0 010 16.3V9.7a1 1 0 011.447-.874L7 10m0 4l6 4m-6-4L3 6m0 4l3-4m6 4l3-4m-3 4V4M3 6l3 4m0 0L3 4m3 0l3 4m0 0L6 4m0 0L3 4" /></svg>
              </div>

              <div className="p-4">
                {/* Judul Video */}
                <h3 className="font-semibold text-lg text-green-700 mb-2">Cara Membuat Kompos dari Sampah Dapur</h3> {/* Menyesuaikan judul video */}
                {/* Deskripsi Singkat */}
                <p className="text-gray-600 text-sm mb-4">Video tutorial lengkap membuat kompos organik di rumah.</p>

                {/* Metadata */}
                <div className="flex items-center justify-between text-gray-500 text-xs mb-4">
                  <span><TimerIcon className="inline-block w-4 h-4 mr-1" /> 12:45</span> {/* Contoh durasi */}
                  <span><UsersIcon className="inline-block w-4 h-4 mr-1" /> 892</span>
                   <span><StarIcon className="inline-block w-4 h-4 mr-1 text-yellow-400" fill="currentColor"/> 4.8</span>
                </div>

                {/* Penulis/Sumber */}
                <div className="flex items-center text-gray-500 text-xs mb-4">
                  <UsersIcon className="inline-block w-4 h-4 mr-1" /> Ibu Hijau
                </div>
                 {/* Tanggal */}
                 <div className="flex items-center text-gray-500 text-xs mb-4">
                     <svg className="inline-block w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h.01M7 12h.01M6 16h.01M10 16h.01M14 16h.01M18 16h.01M16 21H5a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v17l-2-1.5V21z" /></svg> 1 minggu yang lalu
                  </div>


                {/* Tombol Aksi dan Share/Love Container */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200"> {/* Menambahkan garis di sini */}
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-colors duration-200">
                      Tonton Video
                  </button>
                  <div className="flex items-center space-x-2 text-gray-500">
                     <span><svg className="inline-block w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 13.563 9.126 13.745 9.393 13.885c.266.14.551.236.845.291.294.055.594.069.893.069c.3 0 .6-.014.894-.069.293-.055.578-.151.844-.291.267-.14.507-.322.709-.543l3.566-3.566c.92-.92 1.023-2.29.236-3.232-.81-.943-2.25-.943-3.06 0l-1.636 1.636a.5.5 0 01-.707 0L9.07 9.07a.5.5 0 010-.707l1.636-1.636c.81-.943 2.25-.943 3.06 0 .787.942.684 2.312-.236 3.232L15.15 13.342c-.202.221-.442.403-.709.543a3.003 3.003 0 01-4.282 0c-.267-.14-.507-.322-.709-.543z" /></svg></span>
                    <span><HeartIcon className="inline-block w-4 h-4" /></span>
                  </div>
                </div>
                {/* Poin */}
                <div className="text-right text-sm font-semibold text-green-600 mt-2">+10 poin</div>
              </div>
            </div>

             {/* Contoh Kartu Video 2 */}
             <div className="bg-white rounded-lg shadow-md overflow-hidden border border-green-200">
               {/* Placeholder Gambar/Thumbnail Video */}
               <div className="w-full h-40 bg-gray-300 flex items-center justify-center">
                 <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.7V15.3a1 1 0 01-1.447.874L15 14m-7 0L.447 17.124A1 1 0 010 16.3V9.7a1 1 0 011.447-.874L7 10m0 4l6 4m-6-4L3 6m0 4l3-4m6 4l3-4m-3 4V4M3 6l3 4m0 0L3 4m3 0l3 4m0 0L6 4m0 0L3 4" /></svg>
               </div>
               <div className="p-4">
                 <h3 className="font-semibold text-lg text-green-700 mb-2">Origami dari Kertas Bekas: Seni Daur Ulang</h3>
                 <p className="text-gray-600 text-sm mb-4">Teknik origami menggunakan kertas bekas untuk dekorasi rumah.</p>
                 <div className="flex items-center justify-between text-gray-500 text-xs mb-4">
                   <span><TimerIcon className="inline-block w-4 h-4 mr-1" /> 15:20</span>
                   <span><UsersIcon className="inline-block w-4 h-4 mr-1" /> 678</span>
                    <span><StarIcon className="inline-block w-4 h-4 mr-1 text-yellow-400" fill="currentColor"/> 4.7</span>
                 </div>
                 <div className="flex items-center text-gray-500 text-xs mb-4">
                   <UsersIcon className="inline-block w-4 h-4 mr-1" /> Paper Craft Pro
                 </div>
                  <div className="flex items-center text-gray-500 text-xs mb-4">
                      <svg className="inline-block w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h.01M7 12h.01M6 16h.01M10 16h.01M14 16h.01M18 16h.01M16 21H5a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v17l-2-1.5V21z" /></svg> 1 minggu yang lalu
                  </div>

                 <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                   <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-colors duration-200">
                       Tonton Video
                   </button>
                   <div className="flex items-center space-x-2 text-gray-500">
                      <span><svg className="inline-block w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 13.563 9.126 13.745 9.393 13.885c.266.14.551.236.845.291.294.055.594.069.893.069c.3 0 .6-.014.894-.069.293-.055.578-.151.844-.291.267-.14.507-.322.709-.543l3.566-3.566c.92-.92 1.023-2.29.236-3.232-.81-.943-2.25-.943-3.06 0l-1.636 1.636a.5.5 0 01-.707 0L9.07 9.07a.5.5 0 010-.707l1.636-1.636c.81-.943 2.25-.943 3.06 0 .787.942.684 2.312-.236 3.232L15.15 13.342c-.202.221-.442.403-.709.543a3.003 3.003 0 01-4.282 0c-.267-.14-.507-.322-.709-.543z" /></svg></span>
                     <span><HeartIcon className="inline-block w-4 h-4" /></span>
                   </div>
                 </div>
                  <div className="text-right text-sm font-semibold text-green-600 mt-2">+10 poin</div>
               </div>
             </div>

          </div>
        )}
      </div>
    </div>
  );
}
