import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import millify from 'millify';

import { BiDollar } from 'react-icons/bi';
import { GiDrop, GiMedal, GiPodium } from 'react-icons/gi';
import { TiWaves } from 'react-icons/ti';

import { Chart } from '..';

import './CoinDetails.css';

import newsImage from '../../assets/news.jpg';

const CoinDetails = () => {
  const [loading, setLoading] = useState(true);
  const [coin, setCoin] = useState();
  const [history, setHistory] = useState();
  const [timeframe, setTimeframe] = useState('7d');
  const [coinNews, setCoinNews] = useState([]);

  const { coinId } = useParams();

  const getCoin = () => {
    setLoading(true);
    fetch(`https://coinranking1.p.rapidapi.com/coin/${coinId}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCoin(data.data.coin);
        setLoading(false);
      })
      .catch((error) => console.log(error.message));
  };

  const getCoinHistory = (period) => {
    fetch(`https://coinranking1.p.rapidapi.com/coin/${coinId}/history/${period}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => setHistory(data.data))
      .catch((error) => console.log(error.message));
  };

  const getCoinNews = () => {
    fetch(
      `https://bing-news-search2.p.rapidapi.com/news/search?q=${coin?.name}+Cryptocurrency&freshness=Month&textFormat=Raw&safeSearch=Off&setLang=EN&count=12`,
      {
        method: 'GET',
        headers: {
          'x-bingapis-sdk': 'true',
          'accept-language': 'en',
          'x-rapidapi-host': 'bing-news-search2.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_API_KEY,
        },
      },
    )
      .then((response) => response.json())
      .then((data) => setCoinNews(data.value))
      .catch((error) => console.log(error.message));
  };

  const handleTimeperiodButtonClick = (value) => {
    setTimeframe(value);
    getCoinHistory(value);
  };

  useEffect(() => {
    getCoin();
    getCoinHistory('7d');
  }, []);

  useEffect(() => {
    getCoinNews();
    console.log(coinNews);
  }, [coin]);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div className="grid-container">
      <div className="grid-item coin-overview">
        <div className="coin-header">
          <img className="coin-header__logo" src={coin.iconUrl} alt={coin.name} />
          <h2>{`${coin.name} (${coin.symbol}) price`}</h2>
        </div>
        <p>{`${coin.name} (${coin.symbol}) live price in US dollar (USD). View value statistics, market cap and supply.`}</p>
        <div className="coin-overview__chart-header">
          <h3 className="coin-overview__chart-title">{`${coin.symbol} price chart`}</h3>
          <div className="coin-overview__summary">
            <table className="coin-overview__summary-table">
              <thead>
                <tr>
                  <th className="coin-overview__summary-table__header">Price to USD</th>
                  <th className="coin-overview__summary-table__header"> {`${timeframe} change`}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{`$ ${Number.parseFloat(coin.price).toFixed(2)}`}</td>
                  <td
                    className={history?.change > 0 ? 'text-success' : 'text-danger'}
                  >{`${history?.change} %`}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="chart__wrapper">
          <Chart name={coin.symbol} history={history} />
        </div>
        <div className="timeperiods">
          <ul className="chart__actions">
            <li className="chart__action">
              <button
                type="button"
                className={
                  timeframe === '24h' ? 'chart__button chart__button-active' : 'chart__button'
                }
                onClick={() => handleTimeperiodButtonClick('24h')}
              >
                1D
              </button>
            </li>
            <li className="chart__action">
              <button
                type="button"
                className={
                  timeframe === '7d' ? 'chart__button chart__button-active' : 'chart__button'
                }
                onClick={() => handleTimeperiodButtonClick('7d')}
              >
                1W
              </button>
            </li>
            <li className="chart__action">
              <button
                type="button"
                className={
                  timeframe === '30d' ? 'chart__button chart__button-active' : 'chart__button'
                }
                onClick={() => handleTimeperiodButtonClick('30d')}
              >
                1M
              </button>
            </li>
            <li className="chart__action">
              <button
                type="button"
                className={
                  timeframe === '1y' ? 'chart__button chart__button-active' : 'chart__button'
                }
                onClick={() => handleTimeperiodButtonClick('1y')}
              >
                1Y
              </button>
            </li>
            <li className="chart__action">
              <button
                type="button"
                className={
                  timeframe === '5y' ? 'chart__button chart__button-active' : 'chart__button'
                }
                onClick={() => handleTimeperiodButtonClick('5y')}
              >
                5Y
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="grid-item coin-stats">
        <h3>{`${coin.symbol} value statistics`}</h3>
        <p>{`An overview showing the statistics of ${coin.name}, such as the base and quote currency, the rank, and trading volume.`}</p>
        <table className="coin-stats__table">
          <tbody>
            <tr className="coin-stats__table-row">
              <th className="coin-stats__table-row__header">
                <BiDollar className="stats__icon" />
                <span className="stats__label">Price to USD</span>
              </th>
              <td className="stats__value">$ {Number.parseFloat(coin.price).toFixed(2)}</td>
            </tr>
            <tr className="coin-stats__table-row">
              <th className="coin-stats__table-row__header">
                <GiPodium className="stats__icon" />
                <span className="stats__label">Rank</span>
              </th>
              <td className="stats__value">{coin.rank}</td>
            </tr>
            <tr className="coin-stats__table-row">
              <th className="coin-stats__table-row__header">
                <GiDrop className="stats__icon" />
                <span className="stats__label">24h volume</span>
              </th>
              <td className="stats__value">$ {millify(coin.volume, { precision: 2 })}</td>
            </tr>
            <tr className="coin-stats__table-row">
              <th className="coin-stats__table-row__header">
                <TiWaves className="stats__icon" />
                <span className="stats__label">Market cap</span>
              </th>
              <td className="stats__value">$ {millify(coin.marketCap, { precision: 2 })}</td>
            </tr>
            <tr className="coin-stats__table-row">
              <th className="coin-stats__table-row__header">
                <GiMedal className="stats__icon" />
                <span className="stats__label">All time high</span>
              </th>
              <td className="stats__value">
                $ {Number.parseFloat(coin.allTimeHigh.price).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="grid-item coin-supply">
        <h3>Supply information</h3>
        <p>
          View the total and circulating supply of {coin.name}, including details on how the
          supplies are calculated.
        </p>
        <table className="coin-supply__table">
          <tbody>
            <tr className="coin-supply__table-row">
              <th>Circulating supply</th>
              <td>{`${millify(coin.circulatingSupply, { precision: 2 })} ${coin.symbol}`}</td>
            </tr>
            <tr className="coin-supply__table-row">
              <th>Total supply</th>
              <td>{`${millify(coin.totalSupply, { precision: 2 })} ${coin.symbol}`}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="grid-item coin-description">
        <h3>{`What is ${coin.name} ?`}</h3>
        <div dangerouslySetInnerHTML={{ __html: coin.description }} />
      </div>
      <div className="grid-item coin-links">
        <h3>{`${coin.name} links`}</h3>
        <table className="coin-links__table">
          <tbody>
            {coin.links.map((link) => (
              <tr className="coin-links__table-row">
                <th className="coin-link-type">
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.type}
                  </a>
                </th>
                <td className="coin-link-url">
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.name}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {coinNews ? (
        <div className="grid-item coin-news">
          <h3>{`${coin.name} news`}</h3>
          <div className="coin-news__container">
            {coinNews.map((article) => (
              <div className="coin-news__article">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="coin-news__article-link"
                >
                  <div className="coin-news__article-info">
                    <h5 className="coin-news__article-title">{article.name}</h5>
                    <div className="coin-news__article-provider">
                      <img
                        src={article.provider[0].image?.thumbnail?.contentUrl || newsImage}
                        alt={article.provider[0].name}
                      />
                      <p>{article.provider[0].name}</p>
                    </div>
                  </div>
                  <div className="coin-news__article-image">
                    <img
                      src={article.image?.thumbnail?.contentUrl || newsImage}
                      alt={article.name}
                    />
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CoinDetails;
