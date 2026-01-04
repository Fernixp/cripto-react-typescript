import axios from "axios";
import { CryptoCurrenciesResponseSchema, CryptoPriceSchema } from "../schema/crypto-schema";
import type { Pair } from "../types";

export async function getCryptos() {
  const url =
    "https://data-api.coindesk.com/asset/v1/top/list?page_size=20&sort_by=CIRCULATING_MKT_CAP_USD&sort_direction=DESC&groups=ID,BASIC&toplist_quote_asset=USD&api_key=MiApiKey";

  const {
    data: {
      Data: { LIST: cryptos },
    },
  } = await axios.get(url);
  const result = CryptoCurrenciesResponseSchema.safeParse(cryptos);
  if (result.success) {
    return result.data;
  }
  throw new Error("Invalid data format");
}

export async function getCryptoPrice(pair: Pair) {
  // 1. Construimos la llave dinámica correctamente
  const instrument = `${pair.criptocurrency}-${pair.currency}`;
  const url = `https://data-api.coindesk.com/index/cc/v1/latest/tick?market=cadli&instruments=${instrument}&apply_mapping=true&api_key=MiApiKey`;
  
  const { data: { Data } } = await axios.get(url);

  const targetData = Data[instrument];

  const result = CryptoPriceSchema.safeParse(targetData);

  if (result.success) {
    return result.data;
  }
  console.error(result.error.issues);
  throw new Error("Invalid price data format");
}
