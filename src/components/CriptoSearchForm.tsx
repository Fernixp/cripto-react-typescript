import { useState, type ChangeEvent } from "react";
import { currencies } from "../data";
import { useCryptoStore } from "../store";
import type { Pair } from "../types";
import ErrorMessage from "./ErrorMessage";

const CriptoSearchForm = () => {
  const cryptocurrencies = useCryptoStore((state) => state.cryptocurrencies);

  const [pair, setPair] = useState<Pair>({
    currency: "",
    criptocurrency: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPair({
      ...pair,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = Object.values(pair).every((p) => p !== "");
    if (!value) {
      setError("Ambos campos son obligatorios");
      return;
    }
    setError("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="field">
        <label htmlFor="currency">Moneda</label>
        <select
          name="currency"
          id="currency"
          value={pair.currency}
          onChange={handleChange}
        >
          <option value="">-- Seleccione --</option>
          {currencies.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="criptocurrency">Criptomoneda</label>
        <select
          name="criptocurrency"
          id="criptocurrency"
          value={pair.criptocurrency}
          onChange={handleChange}
        >
          <option value="">-- Seleccione --</option>
          {cryptocurrencies.map((c) => (
            <option key={c.ID} value={c.SYMBOL}>
              {c.NAME}
            </option>
          ))}
        </select>
      </div>
      <input type="submit" value="Cotizar" />
    </form>
  );
};

export default CriptoSearchForm;
