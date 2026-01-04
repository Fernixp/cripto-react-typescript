
import { useState, type ChangeEvent } from "react";
import { currencies } from "../data";
import { useCryptoStore } from "../store";
import type { Pair } from "../types";

const CriptoSearchForm = () => {
  const cryptocurrencies = useCryptoStore((state) => state.cryptocurrencies);
  
  const [pair, setPair] = useState<Pair>({
    currency: '',
    criptocurrency: ''
  })

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPair({
      ...pair,
      [name]: value
    })
  }

  return (
    <form className="form">
      <div className="field">
        <label htmlFor="currency">Moneda</label>
        <select 
          name="currency" 
          id="currency"
          onChange={handleChange}
        >
          <option value="">-- Seleccione --</option>
          {currencies.map(c => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="criptocurrency">Criptomoneda</label>
        <select 
          name="criptocurrency" 
          id="criptocurrency"
          onChange={handleChange}
        >
          <option value="">-- Seleccione --</option>
          {cryptocurrencies.map(c => (
              <option key={c.ID} value={c.SYMBOL}>{c.NAME}</option>
          ))}
        </select>
      </div>
      <input type="submit" value="Cotizar" />
    </form>
  );
};

export default CriptoSearchForm;
