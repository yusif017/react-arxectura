import axios from 'axios';
import store from '../app/store';
import { logout, updateAccessToken } from '../features/authSlice';

const api = axios.create({
  baseURL: "https://api.texnoglobal.az/api/v1/",
});
api.interceptors.response.use(
    response => response,
    async (error) => {
      const originalRequest = error.config;
  
      // 401 status kodu alındıqda
      if (error.response && error.response.status === 401) {
        const state = store.getState(); // Redux store-dan state-i al
        const refreshToken = state.auth.refreshToken; // Refresh token-i əldə et
  
        if (refreshToken) {
          try {
            // Refresh token ilə yeni access token al
            const response = await axios.post('/auth/refresh', { token: refreshToken }); // Refresh endpoint-inizi buraya daxil edin
            const newAccessToken = response.data.accessToken;
  
            // Yeni access token-i Redux store-da güncəllə
            store.dispatch(updateAccessToken(newAccessToken));
  
            // Original request header-ına yeni access token əlavə et
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
  
            // Yenidən original request-i göndər
            return api(originalRequest);
          } catch (refreshError) {
              store.dispatch(logout());
            return Promise.reject(refreshError);
          }
        }
      }
  
      return Promise.reject(error);
    }
  );

export default api;