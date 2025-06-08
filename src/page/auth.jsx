import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setLoggedIn } from "../utils/auth";

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    password: "",
    confirmPassword: ""
  });
  const [notif, setNotif] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Tambahkan logika autentikasi/registrasi
    setNotif(isLogin ? "Login berhasil!" : "Registrasi berhasil!");
    if (isLogin) {
      setLoggedIn(true);
      setTimeout(() => {
        setNotif("");
        navigate("/dashboard");
      }, 1200);
    } else {
      setTimeout(() => setNotif("") , 1200);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-green-100">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        {notif && (
          <div className="mb-4 p-3 rounded bg-green-100 text-green-800 text-center font-semibold border border-green-300 animate-fade-in">
            {notif}
          </div>
        )}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 mb-2">
            <span className="text-4xl">♻️</span>
          </div>
          <h1 className="text-2xl font-bold text-green-700 mb-1">Sortify</h1>
          <p className="text-green-700 text-sm">Platform AI untuk Klasifikasi Sampah</p>
        </div>
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 rounded-l-lg font-semibold ${isLogin ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
            onClick={() => setIsLogin(true)}
          >
            <span className="inline-flex items-center"><span className="mr-2">↩️</span>Masuk</span>
          </button>
          <button
            className={`flex-1 py-2 rounded-r-lg font-semibold ${!isLogin ? "bg-green-700 text-white" : "bg-gray-100 text-gray-500"}`}
            onClick={() => setIsLogin(false)}
          >
            <span className="inline-flex items-center"><span className="mr-2">👤</span>Daftar</span>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Nama lengkap Anda"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                  required
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="phone"
                  placeholder="08123456789"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-1/2 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="Kota"
                  value={form.city}
                  onChange={handleChange}
                  className="w-1/2 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                  required
                />
              </div>
            </>
          )}
          <div>
            <input
              type="email"
              name="email"
              placeholder="nama@email.com"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
              required
            />
          </div>
          {!isLogin && (
            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Konfirmasi Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg mt-2"
          >
            {isLogin ? "Masuk ke Sortify" : "Daftar ke Sortify"}
          </button>
        </form>
        {isLogin && (
          <div className="text-right mt-2">
            <a href="#" className="text-green-600 text-sm hover:underline">Lupa password?</a>
          </div>
        )}
        {/* ...hapus tombol login sosial dan pemisah... */}
        <p className="text-center text-xs text-gray-500 mt-2">
          {isLogin
            ? "Bergabunglah dengan 10,000+ eco-warriors lainnya dalam misi menyelamatkan bumi! 🌏"
            : "Dengan mendaftar, Anda menyetujui Syarat & Ketentuan kami"}
        </p>
      </div>
    </div>
  );
}
