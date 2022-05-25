import { gql } from '@apollo/client';

export const QUERY_ITEMS = gql`
  query items {
    items {
      _id
      name
      description
      price
      condition_its_condition_is_in
      category  
      user {
        _id
        username
        email
      } 
    }
  }
`;

// itemText
//       createdAt
//       username
//       commentCount
//       comments {
//         _id
//         createdAt
//         username
//         reactionBody
//       }

export const QUERY_ITEM = gql`
  query item($id: ID!) {
    item(_id: $id) {
      _id
      name
      description
      price
      condition_its_condition_is_in
      category 
      user {
          _id
          username
          email
      }  
    }
  }
`;



// itemText
//       createdAt
//       username
//       commentCount
//       comments {
//         _id
//         createdAt
//         username
//         commentBody
//       }

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      items {
        _id
        name
        description
        price
        condition_its_condition_is_in
        category   
      }
    }
  }
`;



export const QUERY_ME = gql`
{
    me {
        _id
        username
        email
        items {
        _id
        name
        description
        price
        condition_its_condition_is_in
        category   
        }
    }
}
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;