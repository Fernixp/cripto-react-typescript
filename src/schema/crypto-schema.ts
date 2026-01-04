import z from "zod";

export const CurrencySchema = z.object({
  code: z.string(),
  name: z.string(),
});

export const CryptoCurrencyResponseSchema = z.object({
    NAME: z.string(), //Bitcoin
    SYMBOL: z.string(), //BTC
    LOGO_URL: z.string(),
    UPDATED_ON: z.number(),
  });

export const CryptoCurrenciesResponseSchema = z.array(CryptoCurrencyResponseSchema);