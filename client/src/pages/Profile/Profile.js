import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import ItemsContainer from '../../containers/ItemsContainer'
import {
  Grid,
  Card,
  Typography,
  CardContent,
  CardHeader
} from '@material-ui/core'
import ItemCard from '../../components/ItemCard'
import Gravatar from 'react-gravatar'

import styles from './styles'

const Profile = ({ classes }) => {
  return (
    <ItemsContainer>
      {({ userItemsData: { data, loading, error } }) => {
        if (loading) {
          return 'Content Loading...'
        }
        if (error) {
          return `error: ${error.message}`
        }
        return (
          <Grid
            container
            spacing={16}
            direction="column"
            className={classes.root}
          >
            <Grid item xs={12} className={classes.headerCard}>
              <Card className={classes.card}>
                <CardContent>
                  <Gravatar
                    className={classes.avatar}
                    email={data.user.email}
                  />
                  <Typography className={classes.name} variant="display3" component="h2">
                    {data.user.fullname}
                  </Typography>
                  <Typography variant='headline'>
                    <span className={classes.bold}>{data.user.items.length} </span>Items shared{' '}
                    <span className={classes.bold}>{data.user.borrowed.length}</span> Items Borrowed
                  </Typography>
                  <Typography>{data.user.bio}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Typography color="primary" variant="display1">
                Shared Items
              </Typography>
            </Grid>
            <Grid container spacing={24}>
              {data.user.items.map(item => (
                <Grid key={item.id} item xs={12} sm={6} lg={4}>
                  <ItemCard item={item} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        )
      }}
    </ItemsContainer>
  )
}

export default withStyles(styles)(Profile)
