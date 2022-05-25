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
<<<<<<< HEAD
      category
      condition_its_condition_is_in
=======
      condition_its_condition_is_in
      category   
>>>>>>> bd27042d5f50721b8c4cecd46f2ed5cd600da666
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
<<<<<<< HEAD
        category
        condition_its_condition_is_in
=======
        condition_its_condition_is_in
        category   
>>>>>>> bd27042d5f50721b8c4cecd46f2ed5cd600da666
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
<<<<<<< HEAD
        category
        condition_its_condition_is_in
=======
        condition_its_condition_is_in
        category   
>>>>>>> bd27042d5f50721b8c4cecd46f2ed5cd600da666
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