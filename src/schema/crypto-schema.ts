import z from "zod";

export const CurrencySchema = z.object({
  code: z.string(),
  name: z.string(),
});

export const CryptoCurrencyResponseSchema = z.object({
    ID: z.number(),
    NAME: z.string(), //Bitcoin
    SYMBOL: z.string(), //BTC
    LOGO_URL: z.string(),
    UPDATED_ON: z.number(),
  });

export const CryptoCurrenciesResponseSchema = z.array(CryptoCurrencyResponseSchema);

export const PairSchema = z.object({
  currency: z.string(),
  criptocurrency: z.string(),
});

export const CryptoPriceSchema = z.object({
  // --- Datos de Tiempo y Referencia ---
  VALUE_LAST_UPDATE_TS: z.number(), // Timestamp Unix de la última actualización (segundos)
  INSTRUMENT: z.string(),           // El par consultado (ej. BTC-USD)
  
  // --- Precios Actuales ---
  VALUE: z.number(),                // Precio actual en tiempo real
  VALUE_FLAG: z.string(),           // Indica tendencia inmediata ("UP", "DOWN", "STATIONARY")
  
  // --- Rendimiento del Día (24h) ---
  CURRENT_DAY_HIGH: z.number(),     // El precio más alto alcanzado en las últimas 24 horas
  CURRENT_DAY_LOW: z.number(),      // El precio más bajo alcanzado en las últimas 24 horas
  CURRENT_DAY_OPEN: z.number(),     // Precio con el que abrió el mercado hoy
  CURRENT_DAY_CHANGE: z.number(),   // Diferencia absoluta de precio hoy (en moneda fiat)
  CURRENT_DAY_CHANGE_PERCENTAGE: z.number(), // Variación porcentual hoy (ej. 0.55 para 0.55%)

  // --- Rendimiento Histórico (Opcional pero muy útil) ---
  LIFETIME_HIGH: z.number(),        // El precio más alto de toda la historia (ATH)
  LIFETIME_LOW: z.number(),         // El precio más bajo de toda la historia
  
  // --- Volumen de Mercado ---
  CURRENT_DAY_VOLUME: z.number(),   // Cantidad de criptomonedas transaccionadas hoy
});