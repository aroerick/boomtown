import { adopt } from 'react-adopt'
import { Mutation } from 'react-apollo'
import React from 'react'

import client from '../apollo'

import {
  VIEWER_QUERY,
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
  SIGNUP_MUTATION
} from '../apollo/queries'

const signup = ({ render }) => {
  /**
   * @TODO: Use Apollo's <Mutation /> component to use the signup mutation.
   */
  return undefined
}

const login = ({ render }) => (
  <Mutation
    mutation={LOGIN_MUTATION}
    refetchQueries={result => [{ query: VIEWER_QUERY }]}
  >
    {(mutation, { data, error, loading }) =>
      render({ mutation, data, error, loading })
    }
  </Mutation>
)

// const logout = ({ render }) => (
//   <Mutation
//   mutation={LOGIN_MUTATION}
//   onCompleted
// )
const AuthContainer = adopt({
  // @TODO: Uncomment each line as you write the corresponding query.
  // signup,
  // login,
  // logout
  // -------------------------------
})

export default AuthContainer
