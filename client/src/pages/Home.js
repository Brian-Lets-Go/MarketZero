import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';
import '../index.css';
import "../fonts/BancoRegular.woff";
import logo from '../images/logo-04.jpg'


import ThoughtList from '../components/ThoughtList';
const Home = () => {
    const { loading, data } = useQuery(QUERY_THOUGHTS);

    const thoughts = data?.thoughts || [];
    console.log(thoughts);

    return (
        <main>
          <div className='flex-row justify-space-between'>
          <img src= {logo} className='logo' alt="logo for market zero"/>
          <div className="col-12 mb-3">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
      )}
    </div>
          </div>
        </main>
      );
};

export default Home;