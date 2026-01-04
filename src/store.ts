import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { CryptoCurrency } from "./types";
import { getCryptos } from "./services/CryptoService";

/* Definiendo el tipo para el estado */
type CryptoState = {
  cryptocurrencies: CryptoCurrency[];
  fetchCryptos: () => Promise<void>
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
    }
})));