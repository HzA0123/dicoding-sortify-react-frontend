import React, { useState, useRef } from 'react';
import { UploadCloudIcon, FolderIcon, CameraIcon } from 'lucide-react';
import { detectSampah } from '../utils/api';

export default function Classification() {
  const [stats, setStats] = useState(() => {
    const savedStats = localStorage.getItem('wasteStats');
    return savedStats ? JSON.parse(savedStats) : {
      cardboard: 0,
      glass: 0,
      metal: 0,
      paper: 0,
      plastic: 0,
      trash: 0
    };
  });

  const wasteCategories = [
    { name: 'Cardboard', items: stats.cardboard, color: 'bg-yellow-700', placeholderColor: 'bg-yellow-200' },
    { name: 'Glass', items: stats.glass, color: 'bg-blue-400', placeholderColor: 'bg-blue-100' },
    { name: 'Metal', items: stats.metal, color: 'bg-gray-500', placeholderColor: 'bg-gray-200' },
    { name: 'Paper', items: stats.paper, color: 'bg-green-400', placeholderColor: 'bg-green-100' },
    { name: 'Plastic', items: stats.plastic, color: 'bg-pink-500', placeholderColor: 'bg-pink-100' },
    { name: 'Trash', items: stats.trash, color: 'bg-red-500', placeholderColor: 'bg-red-200' }
  ];

  // State untuk file dan kamera
  const [selectedFile, setSelectedFile] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);
  const [cameraError, setCameraError] = useState("");

  // State hasil deteksi
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // TODO: Ganti dengan cara ambil token dari context/auth
  const token = localStorage.getItem('token');

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

  // Update stats when detection is successful
  const updateStats = (detectedClass) => {
    const category = detectedClass.toLowerCase();
    const newStats = {
      ...stats,
      [category]: (stats[category] || 0) + 1
    };
    setStats(newStats);
    localStorage.setItem('wasteStats', JSON.stringify(newStats));
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
      
      // Update stats based on detection result
      if (res && res.data && res.data.detections) {
        const detectedClass = res.data.detections[0]?.class || 
                            res.data.detections[0]?.jenis_sampah ||
                            res.data.detections[0]?.label;
        if (detectedClass) {
          updateStats(detectedClass);
        }
      }
    } catch (err) {
      setError(err.message || 'Gagal mendeteksi sampah');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-green-50 min-h-screen"> {/* Added light green background and padding */}
      <h1 className="text-3xl font-bold text-green-800 mb-2">Klasifikasi Sampah AI</h1> {/* Adjusted text size and color */}
      <p className="text-gray-600 mb-8">Upload foto sampah untuk mendapatkan klasifikasi otomatis dan rekomendasi daur ulang yang tepat</p>

      {/* Upload & Klasifikasi Section */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-green-200 mb-8">
        <h2 className="text-xl font-semibold text-green-700 mb-4">Upload & Klasifikasi</h2>
        <p className="text-gray-600 mb-6">Teknologi AI kami dapat mengidentifikasikan berbagai jenis sampah dengan akurasi tinggi</p>

        {/* Drag and Drop Area */}
        <form onSubmit={handleDetect}>
          <div className="border-2 border-dashed border-green-400 rounded-lg p-4 md:p-10 text-center mb-6 hover:border-green-600 transition-colors duration-200">
            <UploadCloudIcon className="mx-auto w-12 h-12 md:w-16 md:h-16 text-green-500 mb-4" />
            <p className="text-lg md:text-xl font-semibold text-gray-700 mb-2">Upload Foto Sampah</p>
            <p className="text-sm md:text-base text-gray-500">Drag & drop atau klik untuk memilih file (JPG, PNG, max 5MB)</p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="fileInput"
              onChange={handleFileChange}
            />
            <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-2 sm:space-y-0 mt-4">
              <label htmlFor="fileInput" className="btn btn-success w-full sm:w-auto">
                <FolderIcon className="w-5 h-5 mr-2" /> Pilih File
              </label>
              <button type="button" className="btn btn-outline btn-success w-full sm:w-auto" onClick={handleOpenCamera}>
                <CameraIcon className="w-5 h-5 mr-2" /> Buka Kamera
              </button>
            </div>
            {selectedFile && (
              <div className="mt-4 flex flex-col items-center">
                <span className="text-green-700 font-semibold mb-2">File terpilih: {selectedFile.name}</span>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  className="max-h-64 rounded-lg border border-green-300 shadow mb-2"
                  style={{objectFit: 'contain', maxWidth: '100%'}}
                />
              </div>
            )}
            {cameraActive && (
              <div className="mt-4 flex flex-col items-center">
                <video ref={videoRef} autoPlay playsInline className="rounded-lg border border-green-300 w-full max-w-xs mb-2" />
                <div className="flex gap-2">
                  <button className="btn btn-success btn-sm" onClick={handleCapture}>Ambil Foto</button>
                  <button className="btn btn-outline btn-error btn-sm" onClick={handleCloseCamera}>Tutup Kamera</button>
                </div>
                {cameraError && <div className="text-red-500 mt-2">{cameraError}</div>}
              </div>
            )}
            <button type="submit" className="btn btn-success mt-6" disabled={loading}>
              {loading ? 'Mendeteksi...' : 'Deteksi Sampah'}
            </button>
            {error && <div className="text-red-500 mt-4">{error}</div>}
            {result && (
              <div className="mt-6 flex flex-col items-center justify-center">
                <div className="p-4 bg-green-100 rounded-lg border border-green-300 w-full max-w-lg mx-auto">
                  <h3 className="text-lg font-bold text-green-800 mb-2 text-center">Hasil Deteksi</h3>
                  {/* Tampilkan hasil deteksi dengan tampilan menarik */}
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
                        // Ambil deteksi pertama dari data yang benar
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

      {/* Kategori Sampah yang Didukung Section */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-green-200">
        <h2 className="text-xl font-semibold text-green-800 mb-6">Kategori Sampah yang Didukung</h2> {/* Adjusted text color and margin */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"> {/* Adjusted grid columns for responsiveness */}
          {wasteCategories.map((category, index) => (
            <div key={index} className="border border-green-200 rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center ${category.placeholderColor} mb-3`}></div>
              <p className="text-lg font-semibold text-gray-800 mb-1">{category.name}</p>
              <p className="text-sm text-gray-600">{category.items} Item</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}