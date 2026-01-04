import axios from "axios";
import { CryptoCurrenciesResponseSchema } from "../schema/crypto-schema";

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
