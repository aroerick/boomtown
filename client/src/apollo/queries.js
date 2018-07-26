import gql from 'graphql-tag'

/**
 * Item and user-related queries and mutations.
 */

const ItemFields = gql`
  fragment ItemFields on Item {

    id
    title
    imageurl
    description
    created
    tags {
      id
      title
    }
    itemowner {
      id
      fullname
      email
      bio
    }
    borrower {
      id
      fullname
      email
      bio
    }
    # See the Apollo docs for instructions on how to use fragments:
    # https://www.apollographql.com/docs/angular/features/fragments.html
  }
`
export const ITEM_QUERY = gql`
  query item($id: ID!) {
    item{
      ...ItemFields
    }
  }
  ${ItemFields}
`

export const ALL_ITEMS_QUERY = gql`
  query($filter: ID) {
    items (filter: $filter){
      ...ItemFields
    }
    # @TODO: Query items (optionally by tag id) and return the ItemFields fragment.
  }
  
  ${ItemFields}
`

export const ALL_USER_ITEMS_QUERY = gql`
    # @TODO: Query the bio, email, fullname, items, and borrowed for the user by id
    # Use the ItemFields fragment for the items and borrowed fields.
  query($id: ID!) {
  user(id: $id) {
    fullname
    email
    bio
    items {
      ...ItemFields
    }
    borrowed {
      ...ItemFields
    }
  }
  }
  ${ItemFields}
`

export const ALL_TAGS_QUERY = gql`
  query {
    tags {
      title
    }
  }
`

export const ADD_ITEM_MUTATION = gql`
  mutation addItem($item: NewItemInput!, $image: Upload!) {
    item(item: $item, image: $image) {
      id
    }
  }
`

/**
 * Auth-related queries and mutations.
 */

// export const VIEWER_QUERY = gql`
//   query {
//     # @TODO: Query the id, email, fullname, and bio fields for the viewer.
//   }
// `
// export const LOGOUT_MUTATION = gql`
//   mutation {
//     # @TODO: Run the logout mutation.
//   }
// `

// export const SIGNUP_MUTATION = gql`
//   mutation signup($user: SignupInput!) {
//     # @TODO: Pass the user into the signup mutation as an argument
//     # and return the id of the new user when the mutation is complete.
//   }
// `

// export const LOGIN_MUTATION = gql`
//   mutation login($user: LoginInput!) {
//     # @TODO: Pass the user into the login mutation as an argument
//     # and return the id of the new user when the mutation is complete.
//   }
// `
