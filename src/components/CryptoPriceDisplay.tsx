import { useMemo } from "react";
import { useCryptoStore } from "../store";

import { formatCurrency } from "../helpers";
export default function CryptoPriceDisplay() {
    const result = useCryptoStore((state) => state.result);
    const pair = useCryptoStore((state) => state.pair); // Obtenemos la selección
    const cryptocurrencies = useCryptoStore((state) => state.cryptocurrencies);
    const hasResult = useMemo(() => {
        /* Verificamos si el objeto tiene al menos una propiedad */
        return Object.keys(result).length > 0;
    }, [result]);

    /* Info adicional de la criptomoneda */
    const cryptoInfo = useMemo(() => {
        return cryptocurrencies.find(c => c.SYMBOL === pair.criptocurrency);
    }, [pair.criptocurrency, cryptocurrencies]);
    return (
        <div className="result-wrapper">
            {hasResult && (
                <>
                    <h2>Cotización</h2>
                    <div className="result">
                        <img src={cryptoInfo?.LOGO_URL} alt={'Logo ' + cryptoInfo?.NAME} />
                        <div>
                            <p>
                                El precio es de: <span>{formatCurrency(result.VALUE, pair.currency)}</span>
                            </p>
                            <p>El precio es de: <span>{formatCurrency(result.VALUE, pair.currency)}</span></p>
                            <p>Variación últimas 24h: <span>{result.CURRENT_DAY_CHANGE_PERCENTAGE}%</span></p>

                            <p>Precio más alto del día: <span>{formatCurrency(result.CURRENT_DAY_HIGH, pair.currency)}</span></p>

                            <p>Precio más bajo del día: <span>{formatCurrency(result.CURRENT_DAY_LOW, pair.currency)}</span></p>

                            <p>Precio de apertura hoy: <span>{formatCurrency(result.CURRENT_DAY_OPEN, pair.currency)}</span></p>

                            <p>Variación de precio hoy: <span>{formatCurrency(result.CURRENT_DAY_CHANGE, pair.currency)}</span></p>

                            <p>Máximo histórico (ATH): <span>{formatCurrency(result.LIFETIME_HIGH, pair.currency)}</span></p>

                            <p>Mínimo histórico: <span>{formatCurrency(result.LIFETIME_LOW, pair.currency)}</span></p>

                            <p>Volumen transaccionado hoy: <span>{result.CURRENT_DAY_VOLUME} {pair.criptocurrency}</span></p>

                            <p>Última actualización: <span>{new Date(result.VALUE_LAST_UPDATE_TS * 1000).toLocaleString()}</span></p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
