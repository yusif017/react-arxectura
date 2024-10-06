import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store'; 
import { login, logout,updateAccessToken } from '../features/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  
  // Redux state'ini alıyoruz
  const { isAuthenticated,accessToken,username } = useSelector((state: RootState) => state.auth);

  // Giriş fonksiyonu
  const handleLogin = (accessToken:string ,refreshToken:string,username:string) => {
    dispatch(login({ accessToken ,refreshToken,username}));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleUpdateToken = (accessToken: string) => {
    dispatch(updateAccessToken(accessToken));
  };

  return {
    isAuthenticated,
    accessToken,
    username,
    handleLogin,
    handleLogout,
    handleUpdateToken,
  };
};
