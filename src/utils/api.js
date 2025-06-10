// src/utils/api.js

const API_BASE = 'http://localhost:3000/api'; // Ganti ke URL backend Express

// Helper untuk handle response
async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw error || { message: 'Network error' };
  }
  return response.json();
}

// AUTH
export async function loginUser({ email, password }) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res);
}

export async function registerUser({ name, email, password }) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  return handleResponse(res);
}

// USER
export async function getUserProfile(token) {
  const res = await fetch(`${API_BASE}/user/profile`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return handleResponse(res);
}

export async function updateUserProfile(data, token) {
  const res = await fetch(`${API_BASE}/user/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

// DELETE ACCOUNT
export const deleteAccount = async (token) => {
  const response = await fetch(`${API_BASE}/account/delete`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const responseJson = await response.json();
  
  if (!response.ok) {
    throw new Error(responseJson.message);
  }
  
  return responseJson;
};

// EXPORT USER DATA (opsional)
export async function exportUserData(token) {
  const res = await fetch(`${API_BASE}/user/export`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  // Asumsikan backend mengirim file (misal CSV/JSON), handle sebagai blob
  if (!res.ok) throw new Error('Gagal export data user');
  return res.blob(); // return file blob
}

// KLASIFIKASI SAMPAH
export async function detectSampah(formData, token) {
  const res = await fetch(`${API_BASE}/sampah/detect`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });
  return handleResponse(res);
}

// EDUKASI
export async function getEdukasi(token) {
  const res = await fetch(`${API_BASE}/edukasi`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return handleResponse(res);
}
