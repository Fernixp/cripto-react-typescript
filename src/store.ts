import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { CryptoCurrency, CryptoPrice, Pair } from "./types";
import { getCryptos, getCryptoPrice } from "./services/CryptoService";

/* Definiendo el tipo para el estado */
type CryptoState = {
  cryptocurrencies: CryptoCurrency[];
  result: CryptoPrice;
  loading: boolean;
  pair: Pair;
  fetchCryptos: () => Promise<void>
  getCryptoPrice: (pair: Pair) => Promise<void>
};

export const useCryptoStore = create<CryptoState>()(devtools((set) => ({
    cryptocurrencies: [],
    result: {} as CryptoPrice,
    pair: {} as Pair,
    loading: false,
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
            set({ loading: true });
            const result = await getCryptoPrice(pair);
            set(() => ({
                result,
                pair,
                loading: false,
            }));
        } catch (error) {
            console.error('Error fetching crypto price:', error);
            set({ loading: false });
            return null;
        }
    }
})));