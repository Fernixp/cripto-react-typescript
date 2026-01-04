import { useMemo } from "react";
import { useCryptoStore } from "../store";

import { formatCurrency } from "../helpers";
import { Spinner } from "./Spinner";
export default function CryptoPriceDisplay() {
    const result = useCryptoStore((state) => state.result);
    const pair = useCryptoStore((state) => state.pair);
    const cryptocurrencies = useCryptoStore((state) => state.cryptocurrencies);
    const loading = useCryptoStore((state) => state.loading);

    const hasResult = useMemo(() => Object.keys(result).length > 0, [result]);
    const cryptoInfo = useMemo(() => 
        cryptocurrencies.find(c => c.SYMBOL === pair.criptocurrency), 
    [pair.criptocurrency, cryptocurrencies]);

    return (
        <div className="result-wrapper">
            {loading ? (
                <div className="loading-container">
                    <Spinner />
                    <p>Calculando cotización...</p>
                </div>
            ) : hasResult && (
                <div className="">
                    <div className="card-header">
                        <img src={cryptoInfo?.LOGO_URL} alt={cryptoInfo?.NAME} />
                        <div>
                            <h2>{cryptoInfo?.NAME} <span>({pair.criptocurrency})</span></h2>
                            <p className="main-price">{formatCurrency(result.VALUE, pair.currency)}</p>
                            <span className={`badge ${result.CURRENT_DAY_CHANGE_PERCENTAGE > 0 ? 'up' : 'down'}`}>
                                {result.CURRENT_DAY_CHANGE_PERCENTAGE}%
                            </span>
                        </div>
                    </div>

                    <div className="grid-stats">
                        <div className="stat-item">
                            <p className="stat-label">Máximo hoy</p>
                            <p className="stat-value">{formatCurrency(result.CURRENT_DAY_HIGH, pair.currency)}</p>
                        </div>
                        <div className="stat-item">
                            <p className="stat-label">Mínimo hoy</p>
                            <p className="stat-value">{formatCurrency(result.CURRENT_DAY_LOW, pair.currency)}</p>
                        </div>
                        <div className="stat-item">
                            <p className="stat-label">Variación diaria</p>
                            <p className={`stat-value ${result.CURRENT_DAY_CHANGE > 0 ? 'text-up' : 'text-down'}`}>
                                {formatCurrency(result.CURRENT_DAY_CHANGE, pair.currency)}
                            </p>
                        </div>
                        <div className="stat-item">
                            <p className="stat-label">Volumen 24h</p>
                            <p className="stat-value small">{result.CURRENT_DAY_VOLUME} {pair.criptocurrency}</p>
                        </div>
                    </div>

                    <div className="ath-section">
                        <p>Máximo Histórico (ATH): <strong>{formatCurrency(result.LIFETIME_HIGH, pair.currency)}</strong></p>
                        <p>Mínimo Histórico (ATL): <strong>{formatCurrency(result.LIFETIME_LOW, pair.currency)}</strong></p>
                        <p className="update-time">Actualizado: {new Date(result.VALUE_LAST_UPDATE_TS * 1000).toLocaleTimeString()}</p>
                    </div>
                </div>
            )}
        </div>
    );
}