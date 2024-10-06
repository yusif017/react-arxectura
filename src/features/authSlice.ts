import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean; // İstifadəçinin autentifikasiyası
  accessToken: string | null; // Access token
  refreshToken: string | null; // Refresh token
  username: string | null; // İstifadəçi adı
}

// LocalStorage'dan durumu yükleme fonksiyonu
const loadStateFromLocalStorage = (): AuthState => {
  const storedState = localStorage.getItem('authState');
  if (storedState) {
    return JSON.parse(storedState);
  }
  return {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    username: null,
  };
};

// Başlangıç durumu
const initialState: AuthState = loadStateFromLocalStorage();

// auth dilimi
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ accessToken: string; refreshToken: string; username: string }>) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.username = action.payload.username;
      localStorage.setItem('authState', JSON.stringify(state)); // Dəyişiklikləri LocalStorage'a yaz
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.username = null;
      localStorage.removeItem('authState'); // LocalStorage'dan durumu sil
    },
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      localStorage.setItem('authState', JSON.stringify(state)); // Dəyişiklikləri LocalStorage'a yaz
    },
    updateRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
      localStorage.setItem('authState', JSON.stringify(state)); // Dəyişiklikləri LocalStorage'a yaz
    },
  },
});

// Reducer ve action'ları ixrac et
export const { login, logout, updateAccessToken, updateRefreshToken } = authSlice.actions;
export default authSlice.reducer;
