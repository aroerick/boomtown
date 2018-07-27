const styles = theme => ({
    root: {
        flexGrow: 1,
        height: '100%',
        background: theme.palette.secondary.main,
        [theme.breakpoints.up('sm')]:{
            padding: theme.spacing.unit,
            justifyContent:'flex-start'
        }
    }
})

export default styles
