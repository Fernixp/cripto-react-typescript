import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { CryptoCurrency, Pair } from "./types";
import { getCryptos, getCryptoPrice } from "./services/CryptoService";

/* Definiendo el tipo para el estado */
type CryptoState = {
  cryptocurrencies: CryptoCurrency[];
  fetchCryptos: () => Promise<void>
  getCryptoPrice: (pair: Pair) => Promise<any>
};

export const useCryptoStore = create<CryptoState>()(devtools((set) => ({
    cryptocurrencies: [],
    fetchCryptos: async () => {
        try {
            const data = await getCryptos();
            set({ cryptocurrencies: data });
        } catch (error) {
            console.error('Error fetching crypto data:', error);
            set({ cryptocurrencies: [] });
        }
    },
    getCryptoPrice: async (pair: Pair) => {
        try {
            const data = await getCryptoPrice(pair);
            return data;
        } catch (error) {
            console.error('Error fetching crypto price:', error);
            return null;
        }
    }
})));