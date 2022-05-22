import React from 'react';
import ItemList from '../components/ItemList';

import { useQuery } from '@apollo/client';
import { QUERY_ITEMS } from '../utils/queries';

import '../index.css';
import "../fonts/BancoRegular.woff";
import logo from '../images/logo-04.jpg'

const Home = () => {
    const { loading, data } = useQuery(QUERY_ITEMS);

    const items = data?.items || [];
    console.log(items);

    return (
        <main>
          <div className='flex-row justify-space-between'>
          <img src= {logo} className='logo' alt="logo for market zero"/>
          <div className="col-12 mb-3">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ItemList items={items} title="Some Feed for Item(s)..." />
      )}
    </div>
          </div>
        </main>
      );
};

export default Home;