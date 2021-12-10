import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';

import { Exchanges, CoinDetails, Coins, Layout } from './components';

const App = () => (
  <div className="App">
    <Layout>
      <Routes>
        <Route path="/" exact element={<Coins />} />
        <Route path="exchanges" element={<Exchanges />} />
        <Route path="/coin/:coinId" element={<CoinDetails />} />
      </Routes>
    </Layout>
  </div>
);

export default App;
