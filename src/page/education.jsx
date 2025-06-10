import React, { useState } from 'react';
import { Clock, Eye, Star, User } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: 'Limbah Jadi Berkah, Warga Tompaso Raup Cuan dari Sampah Rumah Tangga',
    source: 'Kompas.com',
    description: 'Warga Tompaso berhasil mengubah sampah rumah tangga menjadi peluang usaha yang menguntungkan. Melalui program pengelolaan sampah yang inovatif, mereka tidak hanya membersihkan lingkungan tetapi juga menghasilkan pendapatan tambahan dari pengolahan sampah.',
    link: 'https://money.kompas.com/read/2025/06/08/130000126/limbah-jadi-berkah-warga-tompaso-raup-cuan-dari-sampah-rumah-tangga',
    author: 'Tim Redaksi Kompas',
    date: '8 Juni 2025'
  },
  {
    id: 2,
    title: 'AHY: Sampah di Bantargebang Sudah Menggunung Setinggi 16 Lantai Gedung Perkantoran',
    source: 'Okezone.com',
    description: 'Agus Harimurti Yudhoyono (AHY) menyoroti kondisi mengkhawatirkan di TPST Bantargebang, Bekasi. Tumpukan sampah yang mencapai ketinggian setara gedung 16 lantai menunjukkan urgensi penanganan sampah di Jakarta yang membutuhkan solusi inovatif dan berkelanjutan.',
    link: 'https://economy.okezone.com/amp/2025/05/15/320/3139316/ahy-sampah-di-bantargebang-sudah-menggunung-setinggi-16-lantai-gedung-perkantoran',
    author: 'Tim Redaksi Okezone',
    date: '15 Mei 2025'
  },
  {
    id: 3,
    title: '10 Jenis Sampah Plastik yang Paling Lama Terurai, Butuh 6 Abad',
    source: 'CNBC Indonesia',
    description: 'Penelitian terbaru mengungkap daftar 10 jenis sampah plastik yang memiliki waktu penguraian terlama, mencapai hingga 600 tahun. Temuan ini menekankan pentingnya pengurangan penggunaan plastik dan pentingnya daur ulang untuk mengurangi dampak lingkungan jangka panjang.',
    link: 'https://www.cnbcindonesia.com/research/20250424174938-131-628527/10-jenis-sampah-plastik-yang-paling-lama-terurai-butuh-6-abad',
    author: 'Tim CNBC Indonesia',
    date: '24 April 2025'
  },
  {
    id: 4,
    title: 'Cara Efektif Pengelolaan Sampah Demi Lingkungan Bersih dan Sehat',
    source: 'Liputan6.com',
    description: 'Pengelolaan sampah yang efektif menjadi kunci utama dalam mewujudkan lingkungan yang bersih dan sehat. Artikel ini membahas berbagai metode dan strategi praktis dalam mengelola sampah secara berkelanjutan untuk menciptakan lingkungan yang lebih baik.',
    link: 'https://www.liputan6.com/feeds/read/6034662/cara-efektif-pengelolaan-sampah-demi-lingkungan-bersih-dan-sehat',
    author: 'Tim Liputan6',
    date: '2025'
  }
];

const videos = [
  {
    id: 1,
    title: 'Cara Mudah Mengolah Sampah Organik Menjadi Pupuk Kompos',
    description: 'Tutorial lengkap mengolah sampah organik rumah tangga menjadi pupuk kompos berkualitas.',
    link: 'https://youtu.be/snRhl3ING0Y?si=oBzxI4FOeTUweJ5j',
    author: 'Zero Waste Indonesia',
    duration: '10:25',
    views: '1.2K',
    rating: '4.8'
  },
  {
    id: 2,
    title: 'Tips Mengelola Sampah di Rumah dengan Metode 3R',
    description: 'Panduan praktis menerapkan metode Reduce, Reuse, Recycle dalam pengelolaan sampah rumah tangga.',
    link: 'https://youtu.be/tVuNnac7m0o?si=Jn49GEL5aWnCFHrE',
    author: 'Eco Living',
    duration: '8:15',
    views: '980',
    rating: '4.7'
  },
  {
    id: 3,
    title: 'Inovasi Daur Ulang: Mengubah Sampah Plastik Menjadi Kerajinan',
    description: 'Kreasi unik mengubah sampah plastik menjadi berbagai produk bernilai jual.',
    link: 'https://youtu.be/mbqRd7Vv_b8?si=9DrLRS37YjH-PE8X',
    author: 'Kreasi Daur Ulang',
    duration: '15:30',
    views: '2.1K',
    rating: '4.9'
  },
  {
    id: 4,
    title: 'Bank Sampah: Solusi Cerdas Pengelolaan Sampah Komunitas',
    description: 'Mengenal sistem bank sampah dan manfaatnya bagi lingkungan dan ekonomi masyarakat.',
    link: 'https://youtu.be/xxAypUu7QBA?si=NA75NhEBb8hO9X0L',
    author: 'Komunitas Hijau',
    duration: '12:45',
    views: '1.5K',
    rating: '4.6'
  },
  {
    id: 5,
    title: 'Panduan Lengkap Pemilahan Sampah yang Benar',
    description: 'Cara tepat memilah sampah sesuai jenisnya untuk memaksimalkan proses daur ulang.',
    link: 'https://youtu.be/LPKToHZ5fuI?si=_DBJZPHdMKeqw5qC',
    author: 'Edukasi Lingkungan',
    duration: '9:55',
    views: '1.8K',
    rating: '4.8'
  }
];

export default function Education() {
  const [activeTab, setActiveTab] = useState('artikel');

  const handleTabChange = (tab) => setActiveTab(tab);

  return (
    <div className="p-4 bg-green-50 min-h-screen">
      <h1 className="text-2xl font-bold text-green-800 mb-6">Edukasi Pengelolaan Sampah</h1>
      <p className="text-gray-600 mb-6">Pelajari berbagai teknik daur ulang melalui berita terkini dan video edukasi</p>

      {/* Tab Navigation */}
      <div className="flex mb-6 border-b border-gray-200">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'artikel'
              ? 'border-b-2 border-green-600 text-green-700'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => handleTabChange('artikel')}
        >
          Berita Edukasi
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'video'
              ? 'border-b-2 border-green-600 text-green-700'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => handleTabChange('video')}
        >
          Video Edukasi
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'artikel' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-green-200">
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-green-700 mb-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{article.description}</p>
                  <div className="flex items-center text-gray-500 text-xs mb-2">
                    <span>{article.source}</span>
                    <span className="mx-2">•</span>
                    <span>{article.author}</span>
                    <span className="mx-2">•</span>
                    <span>{article.date}</span>
                  </div>
                  <div className="flex justify-end">
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-success btn-sm"
                    >
                      Baca Berita
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'video' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-green-200">
                <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-green-700 mb-2">{video.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{video.description}</p>
                  <div className="flex items-center justify-between text-gray-500 text-xs mb-4">
                    <span><Clock className="inline-block w-4 h-4 mr-1" /> {video.duration}</span>
                    <span><Eye className="inline-block w-4 h-4 mr-1" /> {video.views}</span>
                    <span><Star className="inline-block w-4 h-4 mr-1 text-yellow-400" fill="currentColor"/> {video.rating}</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-xs mb-4">
                    <User className="inline-block w-4 h-4 mr-1" /> {video.author}
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <a 
                      href={video.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-success btn-sm"
                    >
                      Tonton Video
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}