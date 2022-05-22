import React from 'react';
import { useParams } from 'react-router-dom';

import CommentList from '../components/CommentList';

import { useQuery } from '@apollo/client';
import { QUERY_ITEM } from '../utils/queries';

const SingleItem = (props) => {
  const { id: itemId } = useParams();

  const { loading, data } = useQuery(QUERY_ITEM, {
    variables: { id: itemId },
  });

  const item = data?.item || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {item.username}
          </span>{' '}
          item is {item.createdAt}
        </p>
        <div className="card-body">
          <p>{item.itemText}</p>
        </div>
      </div>

      {item.commentCount > 0 && (
        <CommentList comments={item.comments} />
      )}
    </div>
  );
};

export default SingleItem;
