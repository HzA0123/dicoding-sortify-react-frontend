// Simple auth util using localStorage
export function isLoggedIn() {
  return !!localStorage.getItem('sortify_logged_in');
}

export function setLoggedIn(val) {
  if (val) {
    localStorage.setItem('sortify_logged_in', '1');
  } else {
    localStorage.removeItem('sortify_logged_in');
  }
}
