import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import millify from 'millify';

import { BiCoin, BiSearch } from 'react-icons/bi';

import './Coins.css';
import { GlobalStats } from '..';

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const getCoins = () => {
    fetch(`https://coinranking1.p.rapidapi.com/coins?limit=100`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCoins(data.data.coins);
        setLoading(false);
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    getCoins();
  }, []);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <GlobalStats />
      <div className="coin-list">
        <h1>Top 100 Cryptocurrencies</h1>
        <div className="searchbox">
          <BiCoin className="searchbox__icon" />
          <input
            type="search"
            name="coin-search"
            id="coin-search"
            className="searchbox__input"
            onChange={handleChange}
            placeholder="Search cryptocurrency in Top 100"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
          />
          <BiSearch className="searchbox__icon" />
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table">
            <thead className="thead">
              <tr className="table-header__row">
                <th className="table-header__cell cell-crypto">Cryptocurrency</th>
                <th className="table-header__cell cell-price">Price</th>
                <th className="table-header__cell cell-mc">Market cap</th>
                <th className="table-header__cell cell-change">24h</th>
              </tr>
            </thead>

            {filteredCoins.map((coin) => (
              <Link to={`/coin/${coin.id}`} className="table-body__row-link">
                <tr className="table-body__row" key={coin.id}>
                  <td className="table-body__cell cell-crypto">
                    <div className="coin">
                      <span className="coin-rank">{coin.rank}</span>
                      <span className="coin-logo">
                        <img src={coin.iconUrl} alt={coin.name} />
                      </span>
                      <span className="coin-name">
                        {coin.name}
                        <span className="coin-symbol">{coin.symbol}</span>
                      </span>
                    </div>
                  </td>
                  <td className="table-body__cell cell-price">
                    $ {Number.parseFloat(coin.price).toFixed(2)}
                  </td>
                  <td className="table-body__cell cell-mc">$ {millify(coin.marketCap)}</td>
                  <td
                    className={
                      coin.change > 0
                        ? 'table-body__cell cell-change text-success'
                        : 'table-body__cell cell-change text-danger'
                    }
                  >
                    {coin.change} %
                  </td>
                </tr>
              </Link>
            ))}
          </table>
        )}
      </div>
    </>
  );
};

export default Coins;
