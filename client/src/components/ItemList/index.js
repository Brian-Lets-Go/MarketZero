import React from 'react';
import { Link } from 'react-router-dom';

const ItemList = ({ items }) => {
  if (!items.length) {
    return <h3>No Items Yet</h3>;
  }

  return (
    <div>
      <h3>Items for Sale</h3>
      {items &&
        items.map(item => (
          <div key={item._id} className="card mb-3">
            {/* <p className="card-header">
              <Link
                to={`/profile/${item.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {item.username}
              </Link>{' '}
              Item is {item.createdAt}
            </p> */}
            <div className="card-body">
              <Link to={`/item/${item._id}`}>
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p className="mb-0">
                  Description: {item.description}
                </p>
                <p> Price: {item.price} </p>
                <p>Condition its condition is in: {item.condition_its_condition_is_in} </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ItemList;
