import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import ItemsContainer from '../../containers/ItemsContainer'

import styles from './styles'

const Items = ({ classes }) => {
  return (
    <div>
        <ItemsContainer>
        {({ itemsData: { items, loading, error } }) => {
          if (loading) {
            return 'Content Loading...'
          }
          if (error) {
            return `error: ${error.message}`
          }
          console.log(items)
          return items.map(item => (
            <p key={item.id}>{item.title} {item.description}</p>
          ))
        }}
      </ItemsContainer> 
    </div>
  )
}

export default withStyles(styles)(Items)
