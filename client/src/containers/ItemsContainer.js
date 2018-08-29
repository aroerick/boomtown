import { adopt } from 'react-adopt'
import { Query, Mutation } from 'react-apollo'
import React from 'react'
import {
  ALL_TAGS_QUERY,
  ALL_ITEMS_QUERY,
  ALL_USER_ITEMS_QUERY,
  ADD_ITEM_MUTATION
} from '../apollo/queries'
import { ViewerContext } from '../context/ViewerProvider'

const itemsData = ({ render }) => (
  <ViewerContext.Consumer>
    {({ viewer }) => (
      <Query query={ALL_ITEMS_QUERY} variables={{ filter: viewer.id }}>
        {({ loading, error, data }) => render({ loading, error, data })}
      </Query>
    )}
  </ViewerContext.Consumer>
)

const userItemsData = ({ userId, render }) => (
  <ViewerContext.Consumer>
    {({ viewer }) => (
      <Query
        query={ALL_USER_ITEMS_QUERY}
        variables={{ id: viewer.id || userId }}
      >
        {({ loading, error, data }) => render({ loading, error, data })}
      </Query>
    )}
  </ViewerContext.Consumer>
)

const tagData = ({ render }) => {
  /**
   * @TODO: Use Apollo's <Query /> component to fetch all the tags.
   */

  return (
    <Query query={ALL_TAGS_QUERY}>
      {({ loading, error, data }) => render({ loading, error, data })}
    </Query>
  )
}

const addItem = ({ render }) => (
  /**
   * @TODO: Use Apollo's <Mutation /> component to use the signup mutation.
   *
   * Note: Be sure to use `refetchQueries` to refresh Apollo's cache with the
   * latest items for the user.
   */
  <ViewerContext.Consumer>
    {({ viewer }) => (
      <Mutation
        mutation={ADD_ITEM_MUTATION}
        refetchQueries={result => [
          { query: ALL_USER_ITEMS_QUERY, variables: { id: viewer.id } }
        ]}
      >
        {(mutation, { loading, error, data }) =>
          render({ mutation, loading, error, data })
        }
      </Mutation>
    )}
  </ViewerContext.Consumer>
)
const ItemsContainer = adopt({
  // @TODO: Uncomment each line as you write the corresponding query.
  itemsData,
  userItemsData,
  tagData,
  addItem
  // -------------------------------
})

export default ItemsContainer
