import React, { useState, useEffect } from 'react';
import { UserIcon } from 'lucide-react';
import { getUserProfile } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { deleteAccount } from '../utils/api';

export default function ProfileSettings() {
  const navigate = useNavigate();
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tingkatAkurasiMinimum, setTingkatAkurasiMinimum] = useState('95%');
  const [bahasa, setBahasa] = useState('Bahasa Indonesia');
  const [successMsg, setSuccessMsg] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Ambil foto profil dari localStorage saat mount
  useEffect(() => {
    const localPhoto = localStorage.getItem('profilePhoto');
    if (localPhoto) setPhotoUrl(localPhoto);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem('token');
        const data = await getUserProfile(token);
        const profile = data.profile || {};
        setNama(profile.name || '');
        setEmail(profile.email || '');
        setLokasi(profile.lokasi || profile.city || '');
        // Tidak ambil photoUrl dari backend, hanya dari localStorage
      } catch (err) {
        setError(err.message || 'Gagal memuat profil');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const token = localStorage.getItem('token');
      await deleteAccount(token);
      localStorage.clear(); // Hapus semua data di localStorage
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Gagal menghapus akun');
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      <div className="p-4 bg-green-100 min-h-screen">
        <h1 className="text-xl font-bold text-green-700 mb-6">Pengaturan</h1>
        <p className="text-gray-600 mb-8">Kelola preferensi dan pengaturan akun Anda</p>

        <div className="grid grid-cols-1 gap-8">
          {/* Profil Pengguna */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-green-200">
            <h2 className="text-lg font-semibold text-green-700 mb-4">Profil Pengguna</h2>
            {loading ? (
              <div className="text-gray-500">Memuat data profil...</div>
            ) : error ? (
              <div className="text-red-500 mb-4">{error}</div>
            ) : (
              <>
                <div className="flex items-center mb-4 ">
                  <div className="bg-green-100 p-3 rounded-full mr-4 relative overflow-hidden" style={{width: 56, height: 56, minWidth: 56, minHeight: 56, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    {photoUrl ? (
                      <img
                        src={
                          photoUrl.startsWith('http')
                            ? photoUrl
                            : photoUrl.startsWith('/')
                              ? `${window.location.origin}${photoUrl}`
                              : photoUrl
                        }
                        alt="Foto Profil"
                        className="absolute inset-0 w-full h-full rounded-full object-cover border border-green-300"
                        onError={e => { e.target.onerror = null; e.target.src = ''; }}
                      />
                    ) : (
                      <UserIcon className="w-8 h-8 text-green-700" />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-lg">{nama}</p>
                    <p className="text-sm text-gray-700">{email}</p>
                    <p className="text-sm text-gray-500">{lokasi}</p>
                  </div>
                </div>
                <form
                  className="mb-6"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setSuccessMsg("");
                    setError("");
                    setUploadingPhoto(true);
                    try {
                      const fileInput = e.target.elements.photo;
                      if (!fileInput.files[0]) {
                        setError('Pilih file foto terlebih dahulu');
                        setUploadingPhoto(false);
                        return;
                      }
                      const file = fileInput.files[0];
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        const base64 = reader.result;
                        setPhotoUrl(base64);
                        localStorage.setItem('profilePhoto', base64);
                        setSuccessMsg('Foto profil berhasil disimpan di perangkat.');
                        setUploadingPhoto(false);
                      };
                      reader.onerror = () => {
                        setError('Gagal membaca file');
                        setUploadingPhoto(false);
                      };
                      reader.readAsDataURL(file);
                    } catch {
                      setError('Gagal upload foto');
                      setUploadingPhoto(false);
                    }
                  }}
                >
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    id="profilePhotoInput"
                    style={{ display: 'none' }}
                    onChange={e => {
                      // Auto submit form jika file dipilih
                      if (e.target.form) e.target.form.requestSubmit();
                    }}
                  />
                  <div className="flex gap-2 mb-2">
                    <button
                      type="button"
                      className="btn btn-outline btn-success btn-sm"
                      onClick={() => document.getElementById('profilePhotoInput').click()}
                      disabled={uploadingPhoto}
                    >
                      {uploadingPhoto ? 'Mengupload...' : 'Ganti Foto'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline btn-error btn-sm"
                      onClick={() => {
                        localStorage.removeItem('profilePhoto');
                        setPhotoUrl('');
                        setSuccessMsg('Foto profil berhasil dihapus.');
                        setTimeout(() => setSuccessMsg(''), 2000);
                      }}
                    >
                      Hapus Foto Profil
                    </button>
                  </div>
                </form>
                {successMsg && <div className="text-green-600 mt-2 mb-2">{successMsg}</div>}

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
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={async () => {
                    setSuccessMsg("");
                    setError("");
                    try {
                      const token = localStorage.getItem('token');
                      const updateData = {
                        name: nama,
                        email: email, // walau email tidak diupdate, tetap dikirim agar tidak hilang
                        city: lokasi,
                        lokasi: lokasi
                      };
                      // Hanya kirim field yang diizinkan backend
                      const { updateUserProfile } = await import('../utils/api');
                      const res = await updateUserProfile(updateData, token);
                      if (res.success) {
                        setSuccessMsg("Perubahan profil berhasil disimpan.");
                      } else {
                        setError(res.message || 'Gagal menyimpan perubahan');
                      }
                    } catch (err) {
                      setError(err.message || 'Gagal menyimpan perubahan');
                    }
                  }}
                >
                  Simpan Perubahan
                </button>
                {successMsg && <div className="text-green-600 mt-3">{successMsg}</div>}
              </>
            )}
          </div>

          {/* Preferensi Klasifikasi */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-green-200">
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
          </div>

          {/* Data & Privasi */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-green-200">
            <h2 className="text-lg font-semibold text-green-700 mb-4">Data & Privasi</h2>
            <button className="btn btn-outline w-full mb-3 border-green-500 text-green-700 hover:bg-green-50 hover:border-green-600">
              Hapus Riwayat Klasifikasi
            </button>
            <button
              className="btn btn-outline w-full border-red-500 text-red-700 hover:bg-red-50 hover:border-red-600"
              onClick={() => setShowDeleteModal(true)}
            >
              Hapus Akun
            </button>
            <p className="text-sm text-gray-500 mt-6">
              Kebijakan Privasi
              <br />
              Data Anda aman dan hanya digunakan untuk meningkatkan pengalaman Sortify. Kami tidak membagikan informasi pribadi kepada pihak ketiga.
            </p>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      <dialog className={`modal ${showDeleteModal ? 'modal-open' : ''}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-600">Hapus Akun</h3>
          <p className="py-4">
            Apakah Anda yakin ingin menghapus akun? Tindakan ini tidak dapat dibatalkan dan semua data Anda akan hilang permanen.
          </p>
          <div className="modal-action">
            <button
              className="btn btn-outline"
              onClick={() => setShowDeleteModal(false)}
              disabled={isDeleting}
            >
              Batal
            </button>
            <button
              className="btn btn-error"
              onClick={handleDeleteAccount}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Menghapus...
                </>
              ) : (
                'Ya, Hapus Akun'
              )}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button disabled={isDeleting}>close</button>
        </form>
      </dialog>
    </>
  );
}