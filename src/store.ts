import { create } from "zustand";
import axios from 'axios';
import { CryptoCurrenciesResponseSchema } from "./schema/crypto-schema";
import type { CryptoCurrency } from "./types";

/* Definiendo el tipo para el estado */
type CryptoState = {
  cryptocurrencies: CryptoCurrency[];
  fetchCryptos: () => Promise<void>
};

async function getCryptos(){
    const url = 'https://data-api.coindesk.com/asset/v1/top/list?page_size=10&sort_by=CIRCULATING_MKT_CAP_USD&sort_direction=DESC&groups=ID,BASIC&toplist_quote_asset=USD&api_key=MiApiKey';
    
    const { data: { Data: { LIST: cryptos } } } = await axios.get(url);
    const result = CryptoCurrenciesResponseSchema.safeParse(cryptos);
    if(result.success){
        return result.data;
    }
    throw new Error('Invalid data format');
}

export const useCryptoStore = create<CryptoState>((set) => ({
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
}));