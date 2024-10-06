// localStorageHelper.ts
export const loadBasketFromLocalStorage = () => {
    try {
      const serializedState = localStorage.getItem('basket');
      if (serializedState === null) {
        return undefined; 
      }
      return JSON.parse(serializedState); 
    } catch (err) {
      return undefined;
    }
  };
  
  export const saveBasketToLocalStorage = (basket: any) => {
    try {
      const serializedState = JSON.stringify(basket);
      localStorage.setItem('basket', serializedState);
    } catch (err) {
    }
  };
  