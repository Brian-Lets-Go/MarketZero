import { gql } from '@apollo/client';

export const QUERY_ITEMS = gql`
  query items($username: String) {
    items(username: $username) {
      _id
      itemText
      createdAt
      username
      commentCount
      comments {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_ITEM = gql`
  query item($id: ID!) {
    item(_id: $id) {
      _id
      itemText
      createdAt
      username
      commentCount
      comments {
        _id
        createdAt
        username
        commentBody
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      items {
        _id
        itemText
        createdAt
        commentCount
      }
    }
  }
`;
