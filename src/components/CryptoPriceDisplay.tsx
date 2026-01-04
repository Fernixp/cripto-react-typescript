import { useMemo } from "react";
import { useCryptoStore } from "../store";

import { formatCurrency } from "../helpers";
export default function CryptoPriceDisplay() {
  const result = useCryptoStore((state) => state.result);
  const pair = useCryptoStore((state) => state.pair); // Obtenemos la selección
  const hasResult = useMemo(() => {
    /* Verificamos si el objeto tiene al menos una propiedad */
    return Object.keys(result).length > 0;
  }, [result]);

  return (
    <div>
      {hasResult && (
        <>
          <h2>Cotización</h2>
          <div className="result">
            <div>
              <p>
                El precio es de: <span>{formatCurrency(result.VALUE, pair.currency)}</span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
