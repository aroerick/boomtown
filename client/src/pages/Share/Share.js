import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import { Grid } from '@material-ui/core'
import ShareForm from '../../components/ShareItemForm/ShareItemForm'

import styles from './styles'

const Share = ({ classes }) => {
  return (
    <Grid container spacing={24}>
      <Grid item xs={12}>
        Item card
      </Grid>
      <Grid item xs={12}>
        <ShareForm />
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(Share)
