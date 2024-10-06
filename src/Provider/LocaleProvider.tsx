import React, { useEffect, useMemo, ReactNode } from 'react'; // React və lazımlı hook-ları
import az from "../languages/az.json"; // Azərbaycan dilində mesajlar
import ru from "../languages/ru.json"; // Rus dilində mesajlar
import en from "../languages/en.json"; // İngilis dilində mesajlar
import { IntlProvider } from 'react-intl'; // Beynəlxalqlaşdırma üçün provider
import { useSelector, useDispatch } from 'react-redux'; // Redux hook-ları
import { RootState } from '../app/store'; // Redux store tipi
import { useLocation } from 'react-router-dom'; // Router-dan yol almaq
import { setLocale } from '../features/languageSlice'; // Dil dəyişdirmək üçün action


interface LocaleProviderProps {
  children: ReactNode; // Alt komponentlər
}

const LocaleProvider: React.FC<LocaleProviderProps> = ({ children }) => {
    const dispatch = useDispatch();
    const location = useLocation();
  
    const locale = useSelector((state: RootState) => state.language.locale);
  
    const messages = useMemo(() => ({
      az,
      en,
      ru
    }), []);
    
    
    useEffect(() => {
      const pathLocale = location.pathname.split('/')[1] as 'az' | 'en' | 'ru';
      if (messages[pathLocale]) {
        dispatch(setLocale(pathLocale));
      }
    }, [location.pathname, dispatch, messages]);

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {children}    
    </IntlProvider>
  );
}

export default LocaleProvider;
