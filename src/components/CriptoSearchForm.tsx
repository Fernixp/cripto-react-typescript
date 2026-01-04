const CriptoSearchForm = () => {
  return (
    <form className="form">
      <div className="field">
        <label htmlFor="currency">Moneda</label>
        <select name="currency" id="currency">
          <option value="">-- Seleccione --</option>
          {/* <option value="USD">Dólar Estadounidense</option>
                    <option value="EUR">Euro</option> */}
        </select>
      </div>
      <div className="field">
        <label htmlFor="criptocurrency">Criptomoneda</label>
        <select name="criptocurrency" id="criptocurrency">
          <option value="">-- Seleccione --</option>
          {/* <option value="BTC">Bitcoin</option>
                    <option value="ETH">Ethereum</option> */}
        </select>
      </div>
      <input type="submit" value="Cotizar" />
    </form>
  );
};

export default CriptoSearchForm;
