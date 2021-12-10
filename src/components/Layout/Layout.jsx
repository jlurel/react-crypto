import React from 'react';
import { Footer, Header } from '../index';

import './Layout.css';

const Layout = ({ children }) => (
  <>
    <Header />
    <main className="content">{children}</main>
    <Footer />
  </>
);

export default Layout;
