import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import React, { Component, Fragment } from 'react'
import Typography from '@material-ui/core/Typography'
import { Form, Field } from 'react-final-form'
import AuthContainer from '../../containers/AuthContainer'
import validate from './helpers/validation'
import PropTypes from 'prop-types'

import styles from './styles'

class AccountForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formToggle: true
    }
  }

  render() {
    const { classes } = this.props

    return (
      <AuthContainer>
        {({ signup, login }) => (
          <Form
            onSubmit={
              this.state.formToggle
                ? values => {
                    login.mutation({
                      variables: {
                        user: values
                      }
                    })
                  }
                : values => {
                    signup.mutation({
                      variables: {
                        user: values
                      }
                    })
                  }
            }
            validate={validate}
            render={({ handleSubmit, pristine, invalid, submitting, values }) => (
              <form onSubmit={handleSubmit} className={classes.accountForm}>
                {!this.state.formToggle && (
                  <FormControl fullWidth className={classes.formControl}>
                    <InputLabel htmlFor="fullname">Username</InputLabel>
                    <Field name="fullname">
                      {({ input, meta }) => (
                        <Fragment>
                          <Input id="fullname" type="text" {...input} />
                          {meta.error &&
                            meta.touched && (
                              <Typography className={classes.errorMessage}>
                                {meta.error}
                              </Typography>
                            )}
                        </Fragment>
                      )}
                    </Field>
                  </FormControl>
                )}
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Field name="email">
                    {({ input, meta }) => (
                      <Fragment>
                        <Input id="email" type="text" {...input} />
                        {meta.error &&
                          meta.touched && (
                            <Typography className={classes.errorMessage}>
                              {meta.error}
                            </Typography>
                          )}
                      </Fragment>
                    )}
                  </Field>
                </FormControl>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Field name="password">
                    {({ input, meta }) => (
                      <Fragment>
                        <Input
                          id="password"
                          type="password"
                          inputProps={{
                            autoComplete: 'off'
                          }}
                          {...input}
                        />
                        {meta.error &&
                          meta.touched && (
                            <Typography className={classes.errorMessage}>
                              {meta.error}
                            </Typography>
                          )}
                      </Fragment>
                    )}
                  </Field>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Button
                      type="submit"
                      className={classes.formButton}
                      variant="contained"
                      size="large"
                      color="secondary"
                      disabled={
                        pristine || invalid || submitting
                      }
                    >
                      {this.state.formToggle ? 'Enter' : 'Create Account'}
                    </Button>
                    <Typography>
                      <button
                        className={classes.formToggle}
                        type="button"
                        onClick={() => {
                          this.setState({
                            formToggle: !this.state.formToggle
                          })
                        }}
                      >
                        {this.state.formToggle
                          ? 'Create an account.'
                          : 'Login to existing account.'}
                      </button>
                    </Typography>
                  </Grid>
                </FormControl>
                <Typography className={classes.errorMessage}>
                  {login.error && 'A User with that email or password does not exist'}
                  {signup.error && 'Username taken'}
                </Typography>
              </form>
            )}
          />
        )}
      </AuthContainer>
    )
  }
}

AccountForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AccountForm)
