import React from 'react';
import { Provider as ReduxProvider } from 'react-redux'; // Redux provayderini import edir
import LocaleProvider from './LocaleProvider'; // Lokalizasiya üçün LocaleProvider-i import edir
import store from '../app/store'; // Redux store-u import edir
import { QueryClient, QueryClientProvider } from 'react-query'; // React Query üçün provayderi import edir

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const queryClient = new QueryClient(); // Yeni QueryClient obyekti yaradır

    return (
        <ReduxProvider store={store}> {/* Redux store-u təmin edir */}
            <QueryClientProvider client={queryClient}> {/* React Query üçün client təmin edir */}
                <LocaleProvider> {/* Lokalizasiya provayderini təmin edir */}
                    {children} {/* Alt Komponentləri render edir */}
                </LocaleProvider>
            </QueryClientProvider>
        </ReduxProvider>
    );
}
export default Provider; // Provider komponentini ixrac edir
