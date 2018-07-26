import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import ItemsContainer from '../../containers/ItemsContainer'
// import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
// import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ItemCard from '../../components/ItemCard'

import styles from './styles'

const Items = ({ classes }) => {
  return (
    <div>
        <ItemsContainer>
        {({ itemsData: { data, loading, error } }) => {
          if (loading) {
            return 'Content Loading...'
          }
          if (error) {
            return `error: ${error.message}`
          }
          return data.items.map(item => (
            <ItemCard key={ item.id } item={ item }/>
          ))
        }}
      </ItemsContainer> 
    </div>
  )
}

export default withStyles(styles)(Items)
