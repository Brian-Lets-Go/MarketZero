import React from 'react';
import { ApolloProvider, 
  ApolloClient, 
  InMemoryCache, 
  createHttpLink 
} from '@apollo/client';

import './App.css';

import "./fonts/BancoRegular.woff";

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import verifiedHome from './pages/Verified-Home';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
        <Header />
        <div className="container">
          <Home />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
