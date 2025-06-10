import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box as BoxIcon,
  Globe,
  TrendingUp,
  Recycle,
  Leaf,
  BarChart3,
  Camera
} from "lucide-react";
import { detectSampah } from '../utils/api';

// Import articles data
const articles = [
  {
    id: 1,
    title: 'Limbah Jadi Berkah, Warga Tompaso Raup Cuan dari Sampah Rumah Tangga',
    source: 'Kompas.com',
    description: 'Warga Tompaso berhasil mengubah sampah rumah tangga menjadi peluang usaha yang menguntungkan. Melalui program pengelolaan sampah yang inovatif, mereka tidak hanya membersihkan lingkungan tetapi juga menghasilkan pendapatan tambahan dari pengolahan sampah.',
    author: 'Tim Redaksi Kompas',
    date: '8 Juni 2025',
    link: 'https://money.kompas.com/read/2025/06/08/130000126/limbah-jadi-berkah-warga-tompaso-raup-cuan-dari-sampah-rumah-tangga'
  },
  {
    id: 2,
    title: 'AHY: Sampah di Bantargebang Sudah Menggunung Setinggi 16 Lantai Gedung Perkantoran',
    source: 'Okezone.com',
    description: 'Agus Harimurti Yudhoyono (AHY) menyoroti kondisi mengkhawatirkan di TPST Bantargebang, Bekasi. Tumpukan sampah yang mencapai ketinggian setara gedung 16 lantai menunjukkan urgensi penanganan sampah di Jakarta.',
    author: 'Tim Redaksi Okezone',
    date: '15 Mei 2025',
    link: 'https://economy.okezone.com/amp/2025/05/15/320/3139316/ahy-sampah-di-bantargebang-sudah-menggunung-setinggi-16-lantai-gedung-perkantoran'
  },
  {
    id: 3,
    title: '10 Jenis Sampah Plastik yang Paling Lama Terurai, Butuh 6 Abad',
    source: 'CNBC Indonesia',
    description: 'Penelitian terbaru mengungkap daftar 10 jenis sampah plastik yang memiliki waktu penguraian terlama, mencapai hingga 600 tahun.',
    author: 'Tim CNBC Indonesia',
    date: '24 April 2025',
    link: 'https://www.cnbcindonesia.com/research/20250424174938-131-628527/10-jenis-sampah-plastik-yang-paling-lama-terurai-butuh-6-abad'
  }
];

export default function Dashboard() {
  const navigate = useNavigate();
  // State untuk klasifikasi cepat
  const [selectedFile, setSelectedFile] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);
  const [cameraError, setCameraError] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem('token');

  // State untuk total klasifikasi
  const [totalKlasifikasi, setTotalKlasifikasi] = useState(0);
  const [loadingTotal, setLoadingTotal] = useState(true);

  // Fungsi fetchTotal dibuat di luar agar bisa dipanggil ulang
  async function fetchTotal() {
    setLoadingTotal(true);
    try {
      const res = await fetch('http://localhost:3000/api/sampah/total');
      const data = await res.json();
      if (data.success) {
        setTotalKlasifikasi(data.total);
      }
    } catch (err) { console.error(err); }
    setLoadingTotal(false);
  }

  // State dan fetch untuk total daur ulang
  const [totalDaurUlang, setTotalDaurUlang] = useState(0);
  const [loadingDaurUlang, setLoadingDaurUlang] = useState(true);
  async function fetchDaurUlang() {
    setLoadingDaurUlang(true);
    try {
      const res = await fetch('http://localhost:3000/api/sampah/daur-ulang');
      const data = await res.json();
      if (data.success) {
        setTotalDaurUlang(data.total);
      }
    } catch (err) { console.error(err); }
    setLoadingDaurUlang(false);
  }

  useEffect(() => {
    fetchTotal();
      fetchDaurUlang();
    fetchDaurUlang();
  }, []);

  // Handler pilih file
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handler buka kamera
  const handleOpenCamera = async () => {
    setCameraError("");
    setCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setCameraError("Tidak dapat mengakses kamera: " + err.message);
      setCameraActive(false);
    }
  };

  // Handler tutup kamera
  const handleCloseCamera = () => {
    setCameraActive(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  // Handler ambil foto dari kamera
  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        setSelectedFile(new File([blob], 'capture.jpg', { type: 'image/jpeg' }));
        handleCloseCamera();
      }, 'image/jpeg');
    }
  };

  // Handler submit deteksi sampah
  const handleDetect = async (e) => {
    e.preventDefault();
    setResult(null);
    setError("");
    if (!selectedFile) {
      setError("Silakan pilih atau ambil foto terlebih dahulu.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      const res = await detectSampah(formData, token);
      setResult(res);
      // Refresh total klasifikasi setelah berhasil
      fetchTotal();
    } catch (err) {
      setError(err.message || 'Gagal mendeteksi sampah');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatCard
          title="Total Klasifikasi"
          value={loadingTotal ? '...' : totalKlasifikasi}
          subtitle="Total klasifikasi yang sudah dilakukan"
          color="bg-green-100 text-green-800"
          icon={<BarChart3 className="w-6 h-6" />}
        />
        <StatCard
          title="Sampah Didaur Ulang"
          value={loadingDaurUlang ? '...' : totalDaurUlang}
          subtitle="Total sampah yang berhasil didaur ulang"
          color="bg-blue-100 text-blue-800"
          icon={<Recycle className="w-6 h-6" />}
        />
              </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - News & Updates */}
        <div className="col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <BoxIcon className="w-5 h-5 mr-2" />
                Berita & Update Terbaru
              </h2>
              <button 
                className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-md hover:bg-green-100"
                onClick={() => navigate('/education')}
              >
                Lihat Semua
              </button>
            </div>
            <div className="space-y-4">
              {articles.slice(0, 3).map((article, index) => {
                // Define color schemes for each news item
                const colorSchemes = [
                  {
                    box: 'bg-blue-50',
                    tag: 'bg-blue-100 text-blue-800'
                  },
                  {
                    box: 'bg-purple-50',
                    tag: 'bg-purple-100 text-purple-800'
                  },
                  {
                    box: 'bg-green-50',
                    tag: 'bg-green-100 text-green-800'
                  }
                ];
                
                return (
                  <a 
                    key={article.id}
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:bg-gray-50 transition-colors"
                  >
                    <NewsItem
                      category={article.source}
                      time={article.date}
                      title={article.title}
                      description={article.description}
                      views={Math.floor(Math.random() * 2000) + 500}
                      bgColor={colorSchemes[index].box}
                      tagColor={colorSchemes[index].tag}
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Quick Classification */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Klasifikasi Cepat</h3>
            <p className="text-gray-600 text-sm mb-4">Upload foto untuk klasifikasi instan</p>
            <form onSubmit={handleDetect}>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm mb-3">Ambil foto sampah</p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="quickFileInput"
                  onChange={handleFileChange}
                />
                <div className="flex justify-center space-x-4 mb-4">
                  <label htmlFor="quickFileInput" className="bg-green-600 text-white px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-green-700 flex items-center">
                    Pilih File
                  </label>
                  <button type="button" className="bg-green-100 text-green-700 px-4 py-2 rounded-md text-sm hover:bg-green-200 flex items-center" onClick={handleOpenCamera}>
                    Buka Kamera
                  </button>
                </div>
                {selectedFile && (
                  <div className="mt-4 flex flex-col items-center">
                    <span className="text-green-700 font-semibold mb-2">File terpilih: {selectedFile.name}</span>
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Preview"
                      className="max-h-48 rounded-lg border border-green-300 shadow mb-2"
                      style={{objectFit: 'contain', maxWidth: '100%'}}
                    />
                  </div>
                )}
                {cameraActive && (
                  <div className="mt-4 flex flex-col items-center">
                    <video ref={videoRef} autoPlay playsInline className="rounded-lg border border-green-300 w-full max-w-xs mb-2" />
                    <div className="flex gap-2">
                      <button type="button" className="bg-green-600 text-white px-3 py-1 rounded text-sm" onClick={handleCapture}>Ambil Foto</button>
                      <button type="button" className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm" onClick={handleCloseCamera}>Tutup Kamera</button>
                    </div>
                    {cameraError && <div className="text-red-500 mt-2">{cameraError}</div>}
                  </div>
                )}
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md text-sm mt-6 hover:bg-green-700 w-full" disabled={loading}>
                  {loading ? 'Mendeteksi...' : 'Deteksi Sampah'}
                </button>
                {error && <div className="text-red-500 mt-4">{error}</div>}
                {result && (
                  <div className="mt-6 flex flex-col items-center justify-center">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-300 w-full max-w-lg mx-auto">
                      <h3 className="text-lg font-bold text-green-800 mb-2 text-center">Hasil Deteksi</h3>
                      {Array.isArray((result.data && result.data.detections) ? result.data.detections : result.detections) ? (
                        <div className="flex flex-col items-center">
                          {((result.data && result.data.detections) ? result.data.detections : result.detections).map((item, idx) => {
                            const kategori = (item.jenis_sampah || item.jenis || item.class || item.label || '').toLowerCase();
                            const colorMap = {
                              cardboard: 'bg-yellow-200 border-yellow-500',
                              glass: 'bg-blue-100 border-blue-500',
                              metal: 'bg-gray-200 border-gray-500',
                              paper: 'bg-green-100 border-green-500',
                              plastic: 'bg-pink-100 border-pink-500',
                              trash: 'bg-red-100 border-red-500',
                            };
                            const colorClass = colorMap[kategori] || 'bg-white border-green-200';
                            return (
                              <div key={idx} className={`rounded-lg p-4 border shadow ${colorClass} my-2 w-full max-w-md mx-auto`}>
                                <div className="text-xl font-bold mb-1 capitalize text-center">{item.jenis_sampah || item.jenis || item.class || item.label || 'Tidak diketahui'}</div>
                                {item.confidence !== undefined && (
                                  <div className="text-sm text-gray-600 mb-1 text-center">Confidence: {(item.confidence * 100).toFixed(1)}%</div>
                                )}
                                {item.saran && (
                                  <div className="text-sm text-green-800 mb-1 text-center">Saran: {item.saran}</div>
                                )}
                                {item.image_url && (
                                  <img src={item.image_url} alt="Deteksi" className="mt-2 rounded border mx-auto" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          {(() => {
                            const deteksiArr = (result.data && result.data.detections) ? result.data.detections : result.detections;
                            const deteksi = Array.isArray(deteksiArr) ? deteksiArr[0] : result;
                            const kategori = (deteksi.jenis_sampah || deteksi.jenis || deteksi.class || deteksi.label || '').toLowerCase();
                            const colorMap = {
                              cardboard: 'bg-yellow-200 border-yellow-500',
                              glass: 'bg-blue-100 border-blue-500',
                              metal: 'bg-gray-200 border-gray-500',
                              paper: 'bg-green-100 border-green-500',
                              plastic: 'bg-pink-100 border-pink-500',
                              trash: 'bg-red-100 border-red-500',
                            };
                            const colorClass = colorMap[kategori] || 'bg-white border-green-200';
                            return (
                              <div className={`rounded-lg p-4 border shadow ${colorClass} my-2 w-full max-w-md mx-auto`}>
                                <div className="text-xl font-bold mb-1 capitalize text-center">{deteksi.jenis_sampah || deteksi.jenis || deteksi.class || deteksi.label || 'Tidak diketahui'}</div>
                                {deteksi.confidence !== undefined && (
                                  <div className="text-sm text-gray-600 mb-1 text-center">Confidence: {(deteksi.confidence * 100).toFixed(1)}%</div>
                                )}
                                {deteksi.saran && (
                                  <div className="text-sm text-green-800 mb-1 text-center">Saran: {deteksi.saran}</div>
                                )}
                                {deteksi.image_url && (
                                  <img src={deteksi.image_url} alt="Deteksi" className="mt-2 rounded border mx-auto" />
                                )}
                              </div>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Community Highlights */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Sorotan Komunitas</h3>
            <div className="space-y-3">
              <CommunityItem
                title="Sekolah Hijau Jakarta Raih Penghargaan"
                location="Jakarta • Komunitas"
                description="Tim hijau Jakarta berhasil mendaur ulang 500kg sampah menggunakan Sortify"
              />
              <CommunityItem
                title="Workshop Daur Ulang Komunitas Surabaya"
                location="Surabaya • 3 hari yang lalu"
                description="60 peserta belajar teknik daur ulang plastik menjadi produk berguna"
              />
              <CommunityItem
                title="Bank Sampah Digital Bandung"
                location="Bandung • 1 minggu yang lalu"
                description="Inovasi bank sampah menggunakan teknologi AI untuk klasifikasi otomatis"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, color, icon }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 rounded-lg ${color}`}>
          {icon}
        </div>
        <TrendingUp className="w-4 h-4 text-green-500" />
      </div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
          </div>
  );
}

// Komponen NewsItem untuk berita
function NewsItem({ category, time, title, description, views, bgColor, tagColor }) {
  return (
    <div className="flex items-start space-x-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
      <div className={`p-3 rounded-lg ${bgColor} flex-shrink-0`}>
        <BoxIcon className="w-6 h-6 text-gray-600" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <span className={`${tagColor} text-xs px-2 py-1 rounded`}>{category}</span>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <h4 className="font-medium text-gray-900 mb-2 line-clamp-1">{title}</h4>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{description}</p>
        <div className="flex items-center text-xs text-gray-500">
          <Globe className="w-3 h-3 mr-1" />
          <span>{views} views</span>
        </div>
      </div>
    </div>
  );
}

// Komponen CommunityItem untuk sorotan komunitas
function CommunityItem({ title, location, description }) {
  return (
    <div className="border-l-4 border-green-500 pl-4 py-2">
      <h4 className="font-medium text-gray-900 text-sm mb-1">{title}</h4>
      <p className="text-xs text-gray-500 mb-1">{location}</p>
      <p className="text-xs text-gray-600 line-clamp-2">{description}</p>
    </div>
  );
}
