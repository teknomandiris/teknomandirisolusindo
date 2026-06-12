// Shared helpers (auth + storage)
(function () {
  const TOKEN_KEY = 'warehouse_auth_token';
  const USER_KEY = 'warehouse_user';

  // ===== Auth =====
  window.getAuthToken = function getAuthToken() {
    return localStorage.getItem(TOKEN_KEY);
  };

  window.getAuthUser = function getAuthUser() {
    const token = getAuthToken();
    if (!token) return null;
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return { username: 'user' };
    try {
      return JSON.parse(raw);
    } catch {
      return { username: 'user' };
    }
  };

  window.redirectToLogin = function redirectToLogin() {
    window.location.href = './index.html';
  };

  window.logout = function logout() {
    localStorage.removeItem(TOKEN_KEY);
    // user boleh dihapus biar aman
    localStorage.removeItem(USER_KEY);
    window.location.href = './index.html';
  };

  // ===== Barang =====
  const BARANG_KEY = 'warehouse_barang';

  window.loadBarang = function loadBarang() {
    const raw = localStorage.getItem(BARANG_KEY);
    if (!raw) return [];
    try { return JSON.parse(raw) || []; } catch { return []; }
  };

  window.saveBarang = function saveBarang(items) {
    localStorage.setItem(BARANG_KEY, JSON.stringify(items || []));
  };

  // ===== Data Lain =====
  const OTHER_KEY = 'warehouse_data_lain';

  window.loadDataLain = function loadDataLain() {
    const raw = localStorage.getItem(OTHER_KEY);
    if (!raw) return [];
    try { return JSON.parse(raw) || []; } catch { return []; }
  };

  window.saveDataLain = function saveDataLain(items) {
    localStorage.setItem(OTHER_KEY, JSON.stringify(items || []));
  };

  // ===== Utils =====
  window.escapeHtml = function escapeHtml(s) {
    return (s == null ? '' : String(s))
      .replaceAll('&', '&amp;')
      .replaceAll('<', '<')
      .replaceAll('>', '>')
      .replaceAll('"', '"')
      .replaceAll("'", '&#039;');
  };
})();

