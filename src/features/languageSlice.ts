import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Dəstəklənən dillər
type Locale = 'az' | 'en' | 'ru';

interface LanguageState {
  locale: Locale;
}

// localStorage-dən dili oxumaq (əgər mövcuddursa)
const getStoredLocale = (): Locale => {
  const storedLocale = localStorage.getItem('locale') as Locale | null;
  return storedLocale || 'en'; // Əgər localStorage-də dil yoxdursa, default olaraq 'en' qaytar
};

const initialState: LanguageState = {
  locale: getStoredLocale(), // Default dil localStorage-dən oxunur
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<Locale>) => {
      state.locale = action.payload; // Dil dəyişdirilir
      localStorage.setItem('locale', action.payload); // localStorage-də saxlanır
    },
  },
});

// Actions və reducer export olunur
export const { setLocale } = languageSlice.actions;
export default languageSlice.reducer;
