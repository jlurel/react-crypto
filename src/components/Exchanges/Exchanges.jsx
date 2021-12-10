import React, { useState, useEffect } from 'react';
import millify from 'millify';

import { VscGlobe } from 'react-icons/vsc';

import './Exchanges.css';

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);

  const getExchanges = () => {
    fetch(`https://coinranking1.p.rapidapi.com/exchanges`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setExchanges(data.data.exchanges);
        setLoading(false);
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    getExchanges();
  }, []);

  return (
    <>
      <h1>Exchanges</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table">
          <tr className="table-header__row">
            <th className="table-header__cell">Exchange</th>
            <th className="table-header__cell">Volume (24h)</th>
            <th className="table-header__cell"># Markets</th>
            <th className="table-header__cell">Market share</th>
            <th className="table-header__cell">Website</th>
          </tr>

          {exchanges.map((exchange) => (
            <tr className="table-body__row" key={exchange.id}>
              <td className="table-body__cell">
                <div className="exchange">
                  <span className="exchange-rank">{exchange.rank}</span>
                  <span className="exchange-logo">
                    <img src={exchange.iconUrl} alt={exchange.name} />
                  </span>
                  <span className="exchange-name">{exchange.name}</span>
                </div>
              </td>
              <td className="table-body__cell">$ {millify(exchange.volume)}</td>
              <td className="table-body__cell">{exchange.numberOfMarkets}</td>
              <td className="table-body__cell">
                {`${Number.parseFloat(exchange.marketShare).toFixed(2)} %`}
              </td>
              <td className="table-body__cell">
                <a href={exchange.websiteUrl}>
                  <VscGlobe />
                </a>
              </td>
            </tr>
          ))}
        </table>
      )}
    </>
  );
};

export default Exchanges;
