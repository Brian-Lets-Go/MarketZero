import React from 'react';
// the useParams Hook retrieves the username from the URL which is then passed to the useQuery Hook
import { Navigate, useParams } from 'react-router-dom';

import ItemList from '../components/ItemList';
import ItemForm from '../components/ItemForm';

import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const Profile = (props) => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ?QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
      return (
          <h4>
              Please log in to view this page.
          </h4>
      );
  }

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <ItemList
            items={user.items}
            title={`${user.username}'s items...`}
          />
        </div>

      </div>
      <div className="mb-3">{!userParam && <ItemForm />}</div>
    </div>
  );
};

export default Profile;
