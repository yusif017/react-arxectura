import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../app/store';
import { loadBasketFromLocalStorage, saveBasketToLocalStorage } from '../helper/localStorageHelper';
import Swal from 'sweetalert2';

interface Product {
  id: number;
  quantity: number;
}

interface BasketState {
  basket: any[];
}

const initialState: BasketState = {
  basket: loadBasketFromLocalStorage() || [],
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<Omit<Product, 'quantity'>>) => {
      const existingProduct = state.basket.find(
        (product) => product.id === action.payload.id
      );
      if (!existingProduct) {
        state.basket.push({ ...action.payload, quantity: 1 });
        saveBasketToLocalStorage(state.basket);
        
        Swal.fire({
          icon: 'success',
          title: 'Uğur!',
          text: 'Məhsul səbətə əlavə olundu.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Xəta!',
          text: 'Bu məhsul artıq səbətə əlavə edilib.',
        });
      }
    },
    addMultiToBasket: (state, action: PayloadAction<{ product: Product; quantity:number }>) => {
      const { product, quantity } = action.payload;
    
      const existingProduct = state.basket.find((p) => p.id === product.id);
    
      if (!existingProduct) {
        state.basket.push({ ...product, quantity });
        saveBasketToLocalStorage(state.basket);
    
        // Müsbət xəbərdarlıq
        Swal.fire({
          icon: 'success',
          title: 'Uğur!',
          text: 'Məhsul səbətə əlavə olundu.',
        });
      } else {
        // SweetAlert ilə xəbərdarlıq
        Swal.fire({
          icon: 'error',
          title: 'Xəta!',
          text: 'Bu məhsul artıq səbətə əlavə edilib.',
        });
      }
    },
    
    removeFromBasket: (state, action: PayloadAction<number>) => {
      state.basket = state.basket.filter((product) => product.id !== action.payload);
      saveBasketToLocalStorage(state.basket);
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const product = state.basket.find((product) => product.id === action.payload);
      if (product) {
        product.quantity += 1;
        saveBasketToLocalStorage(state.basket);
        
    
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const product = state.basket.find((product) => product.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
        saveBasketToLocalStorage(state.basket);
        
     
      }
    },
  },
});

export const selectBasketWithTotalPrice = (state: RootState) => {
  const basket = state.basket.basket;
  const totalPrice = basket.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
  return {
    basket,
    totalPrice,
  };
};

export const { addToBasket,addMultiToBasket, removeFromBasket, incrementQuantity, decrementQuantity } = basketSlice.actions;
export default basketSlice.reducer;
