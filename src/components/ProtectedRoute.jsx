import React, { useSyncExternalStore } from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

// Subscribe to localStorage changes for login state
function subscribe(callback) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export default function ProtectedRoute({ children }) {
  // This will re-render when localStorage changes
  useSyncExternalStore(subscribe, () => isLoggedIn());
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
