const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: '100%',
    background: theme.palette.secondary.main,
    [theme.breakpoints.up('xs')]: {
      padding: theme.spacing.unit * 4,
      justifyContent: 'flex-start'
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing.unit * 8,
    },
    margin: 0,
  },
  headerCard: {
    marginTop: 10,
  },
  card: {
    padding: 30,
  },
  avatar: {
    display: 'inline',
    borderRadius: '50%',
  },
  name: {
    display: 'inline',
    paddingLeft: 30,
  },
  bold : {
    fontWeight: 'bold',
  }
})

export default styles
