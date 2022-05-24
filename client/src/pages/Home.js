import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';

import bowling from '../images/bowling.gif';
import alcohol from '../images/white russian.gif';
import rug from '../images/rug top.gif';
import bereavement from '../images/bereavement.gif';
import other from '../images/mug to head.gif';

import ThoughtList from '../components/ThoughtList';
const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className="col-12 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
          )}
        </div>
      </div>
      <section id="items">
        <div className='section-bg'>
          <div className='category-section'>
            <div className='gif-section'>
              <img className='gif' src={bowling} alt=""/>
              <h3 className='overlay'>Bowling</h3>
            </div>
          </div>
        </div>

        <div className='section-bg'>
          <div className='category-section'>
            <div className='gif-section'>
              <img className='gif' src={alcohol} alt=""/>
              <h3 className='overlay'>Alcohol</h3>
            </div>
          </div>
        </div>

        <div className='section-bg'>
          <div className='category-section'>
            <div className='gif-section'>
              <img className='gif' src={rug} alt=""/>
              <h3 className='overlay'>Rugs</h3>
            </div>
          </div>
        </div>

        <div className='section-bg'>
          <div className='category-section'>
            <div className='gif-section'>
              <img className='gif' src={bereavement} alt=""/>
              <h3 className='overlay'>Bereavement Receptacles</h3>
            </div>
          </div>
        </div>

        <div className='section-bg'>
          <div className='category-section'>
            <div className='gif-section'>
              <img className='gif' src={other} alt=""/>
              <h3 className='overlay'>Miscellaneous</h3>
            </div>
          </div>
        </div>

      </section>
    </main>
  );
};

export default Home;