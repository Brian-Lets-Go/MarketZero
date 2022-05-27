import React from 'react';
import ItemList from '../components/ItemList';
// import ItemForm from '../components/ItemForm';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_ITEMS } from '../utils/queries';

import '../index.css';
import "../fonts/BancoRegular.woff";

import all from '../images/all.gif';
import bowling from '../images/bowling.gif';
import alcohol from '../images/white-russian.gif';
import rug from '../images/rug-top.gif';
import bereavement from '../images/bereavement.gif';
import other from '../images/mug.gif';

const Home = () => {
  const { loading, data } = useQuery(QUERY_ITEMS);
  // const { data: userData } = useQuery(QUERY_ME_BASIC);

  const items = data?.items || [];
  console.log(items);

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <section id="items">
        <div className='section-bg'>
          <div className='category-section'>
            <div className='gif-section'>
              <img className='gif' src={all} alt="" />
              <h3 className='overlay'>All</h3>
            </div>
          </div>
        </div>

        <div className='section-bg'>
          <div className='category-section'>
            <div className='gif-section'>
              <img className='gif' src={bowling} alt="" />
              <h3 className='overlay'>Bowling</h3>
            </div>
          </div>
        </div>

        <div className='section-bg'>
          <div className='category-section'>
            <div className='gif-section'>
              <img className='gif' src={alcohol} alt="" />
              <h3 className='overlay'>Alcohol</h3>
            </div>
          </div>
        </div>

        <div className='section-bg'>
          <div className='category-section'>
            <div className='gif-section'>
              <img className='gif' src={rug} alt="" />
              <h3 className='overlay'>Rugs</h3>
            </div>
          </div>
        </div>

        <div className='section-bg'>
          <div className='category-section'>
            <div className='gif-section'>
              <img className='gif' src={bereavement} alt="" />
              <h3 className='overlay'>Bereavement Receptacles</h3>
            </div>
          </div>
        </div>

        <div className='section-bg'>
          <div className='category-section'>
            <div className='gif-section'>
              <img className='gif' src={other} alt="" />
              <h3 className='overlay'>Others/ Miscellaneous</h3>
            </div>
          </div>
        </div>
      </section>

      <div className='flex-row justify-space-between'>
        {loggedIn && (
          <div className="col-12 mb-3">
            {/* <ItemForm /> */}
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ItemList items={items} title="Some Item(s)..." />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;