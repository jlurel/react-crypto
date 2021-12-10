import React, { useEffect, useState } from 'react';
import millify from 'millify';

import './GlobalStats.css';

const GlobalStats = () => {
  const [stats, setStats] = useState();
  const [loading, setLoading] = useState(true);

  const getGlobalStats = () => {
    fetch('https://coinranking1.p.rapidapi.com/stats', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setStats(data.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    getGlobalStats();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Global Crypto Statistics</h1>
      <div className="global-stats__container">
        <div className="global-stats__item">
          <h4>Total Cryptocurrencies</h4>
          <p>{stats.totalCoins}</p>
        </div>
        <div className="global-stats__item">
          <h4>Total Exchanges</h4>
          <p>{stats.totalExchanges}</p>
        </div>
        <div className="global-stats__item">
          <h4>Total Markets</h4>
          <p>{millify(stats.totalMarkets)}</p>
        </div>
        <div className="global-stats__item">
          <h4>Total Market Cap</h4>
          <p>{`$ ${millify(stats.totalMarketCap)}`}</p>
        </div>
        <div className="global-stats__item">
          <h4>Total 24h Volume</h4>
          <p>{`$ ${millify(stats.total24hVolume)}`}</p>
        </div>
      </div>
    </>
  );
};

export default GlobalStats;
