import React from 'react';
// import ItemList from '../components/ItemList';
import ItemForm from '../components/ItemForm';

import Auth from '../utils/auth';
// import { useQuery } from '@apollo/client';
// import { QUERY_ITEMS } from '../utils/queries';

import '../index.css';
import "../fonts/BancoRegular.woff";

const ItemFormPage = () => {
    // const { loading, data } = useQuery(QUERY_ITEMS);
    // const { data: userData } = useQuery(QUERY_ME_BASIC);

    // const items = data?.items || [];
    // console.log(items);

    const loggedIn = Auth.loggedIn();

    return (
        <main>
          <div className='flex-row justify-space-between'>
          {loggedIn && (
        <div className="col-12 mb-3">
            <ItemForm />
        </div>
        )}
          {/* <div className={`col-12 mb-3 ${loggedIn &&'col-lg-8'}`}>
      {loading ? (
        <div>Loading...</div>
          ) : (
            <ItemList items={items} title="Some Item(s)..." />
          )}
          </div> */}
        </div>
      </main>
    );
};

export default ItemFormPage;