import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import ShareItemForm from '../../components/ShareItemForm'
import ShareItemPreview from '../../components/ShareItemPreview'

import styles from './styles'

const Share = ({ classes }) => {
  return (
    <Grid container spacing={32} direction="row" justify="center" alignItems="center" className={classes.gridContainer}>
      <Grid item xs={12} sm={4}>
        <ShareItemPreview />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Typography variant="display2" color='secondary' gutterBottom>Share. Some. Cheese.</Typography>
        <ShareItemForm />
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(Share)
