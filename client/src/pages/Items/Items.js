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
          return items.map(item => (
            <div key={item.id}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography component="h2">
                    {item.title}
                  </Typography>
                  <Typography component="p">
                    {item.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button>Borrow</Button>
                </CardActions>
              </Card>
            </div>
          ))
        }}
      </ItemsContainer> 
    </div>
  )
}

export default withStyles(styles)(Items)
