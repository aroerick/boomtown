import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import React, { Component } from 'react'
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardHeader
} from '@material-ui/core'
import styles from './styles'
import { Link } from 'react-router-dom'
import Gravatar from 'react-gravatar'
import moment from 'moment'


class ItemCard extends Component {
  render() {
    const { classes, item } = this.props
    const itemTags = item.tags.map(tag => tag.title)
    return (
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={item.imageurl} />
        <Link to={`/profile/${item.itemowner.id}`}>
          <CardHeader
            avatar={
              <Gravatar
                className={classes.avatar}
                email={item.itemowner.email}
              />
            }
            title={item.itemowner.fullname}
            subheader={moment(new Date(item.created)).fromNow()}
            className={classes.header}
          />
        </Link>
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {item.title}
          </Typography>
          <Typography component="p" variant="caption">
            {itemTags.join(', ')}
          </Typography>
          <Typography component="p">{item.description}</Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined">Cheese Me</Button>
        </CardActions>
      </Card>
    )
  }
}

export default withStyles(styles)(ItemCard)
