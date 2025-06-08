import React, { useState, useRef } from 'react';
import { UploadCloudIcon, FolderIcon, CameraIcon } from 'lucide-react';

export default function Classification() {
  const wasteCategories = [
    { name: 'Organik', items: 48, percentage: 30, color: 'bg-green-500', placeholderColor: 'bg-green-200' },
    { name: 'Plastik', items: 32, percentage: 25, color: 'bg-blue-500', placeholderColor: 'bg-blue-200' },
    { name: 'Kertas', items: 28, percentage: 22, color: 'bg-yellow-500', placeholderColor: 'bg-yellow-200' },
    { name: 'Kaca', items: 15, percentage: 12, color: 'bg-indigo-500', placeholderColor: 'bg-indigo-200' },
    { name: 'Elektronik', items: 8, percentage: 6, color: 'bg-red-500', placeholderColor: 'bg-red-200' },
  ];

  // State untuk file dan kamera
  const [selectedFile, setSelectedFile] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);
  const [cameraError, setCameraError] = useState("");

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

  return (
    <div className="p-8 bg-green-50 min-h-screen"> {/* Added light green background and padding */}
      <h1 className="text-3xl font-bold text-green-800 mb-2">Klasifikasi Sampah AI</h1> {/* Adjusted text size and color */}
      <p className="text-gray-600 mb-8">Upload foto sampah untuk mendapatkan klasifikasi otomatis dan rekomendasi daur ulang yang tepat</p>

      {/* Upload & Klasifikasi Section */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-green-200 mb-8">
        <h2 className="text-xl font-semibold text-green-700 mb-4">Upload & Klasifikasi</h2>
        <p className="text-gray-600 mb-6">Teknologi AI kami dapat mengidentifikasikan berbagai jenis sampah dengan akurasi tinggi</p>

        {/* Drag and Drop Area */}
        <div className="border-2 border-dashed border-green-400 rounded-lg p-10 text-center mb-6 hover:border-green-600 transition-colors duration-200">
          <UploadCloudIcon className="mx-auto w-16 h-16 text-green-500 mb-4" />
          <p className="text-xl font-semibold text-gray-700 mb-2">Upload Foto Sampah</p>
          <p className="text-gray-500">Drag & drop atau klik untuk memilih file (JPG, PNG, max 5MB)</p>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="fileInput"
            onChange={handleFileChange}
          />
          <div className="flex justify-center space-x-4 mt-4">
            <label htmlFor="fileInput" className="btn btn-success cursor-pointer">
              <FolderIcon className="w-5 h-5 mr-2" /> Pilih File
            </label>
            <button type="button" className="btn btn-outline btn-success" onClick={handleOpenCamera}>
              <CameraIcon className="w-5 h-5 mr-2" /> Buka Kamera
            </button>
          </div>
          {selectedFile && (
            <div className="mt-4 text-green-700 font-semibold">File terpilih: {selectedFile.name}</div>
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