import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!, $age: Int!) {
    addUser(username: $username, email: $email,  password: $password, age: $age) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_ITEM = gql`
  mutation addItem(
      $name: String!, 
      $description: String!, 
      $price: Float!, $condition_its_condition_is_in: String!, 
      $category: String!,
      ) {
    addItem(
        name: $name, 
        description: $description, 
        price: $price, condition_its_condition_is_in: $condition_its_condition_is_in, 
        category: $category) {
      _id
      name
      description
      price
      condition_its_condition_is_in
      category
      
    }
  }
`;