const styles = theme => ({
    root: {
        flexGrow: 1,
        height: '100%',
        background: theme.palette.secondary.main,
        [theme.breakpoints.up('xs')]: {
            padding: theme.spacing.unit * 4,
            justifyContent: 'flex-start'
          },
          [theme.breakpoints.up('md')]: {
            padding: theme.spacing.unit * 8,
          },
        paddingTop: 0,
        marginTop: 0,
    }
})

export default styles
