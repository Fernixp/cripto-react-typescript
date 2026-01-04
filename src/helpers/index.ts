/**
 * Formatea una cantidad como moneda de forma dinámica.
 *
 * @param quantity - La cantidad a formatear.
 * @param currencyCode - El código de la moneda (ej. 'USD', 'BOB', 'EUR').
 * @returns La cantidad formateada según la moneda seleccionada.
 */
export function formatCurrency(quantity: number, currencyCode: string) {
  // Mapeo opcional para usar el formato regional correcto
  const locales: Record<string, string> = {
    BOB: "es-BO",
    USD: "en-US",
    MXN: "es-MX",
    EUR: "de-DE",
    GBP: "en-GB",
  };

  const locale = locales[currencyCode] || "en-US";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  }).format(quantity);
}