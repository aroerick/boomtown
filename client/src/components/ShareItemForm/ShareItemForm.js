import React, { Component, Fragment } from 'react'
import { FormSpy, Form, Field } from 'react-final-form'
import {
  Button,
  TextField,
  Checkbox,
  InputLabel,
  Typography,
  FormControl
} from '@material-ui/core'
import ItemsContainer from '../../containers/ItemsContainer'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import {
  resetImage,
  updateNewItem,
  resetNewItem
} from '../../redux/modules/ShareItemPreview'
import PropTypes from 'prop-types'
import validate from './helpers/validation'
import styles from './styles'

class ShareItemForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileSelected: false,
      selectedTags: [],
      submitted: false
    }
    this.fileInput = React.createRef()
  }
  validate(values) {
    console.log(values)
    const errors = {}
    if (!values.description) {
      errors.description = 'Required'
    }
    if (!values.title) {
      errors.title = 'Required'
    }
    if (!values.tags || values.tags.length === 0) {
      errors.tags = 'Select at least one tag'
    }
    return errors
  }
  getBase64Url() {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.onload = e => {
        resolve(
          `data:${this.state.fileSelected.mimeType};base64, ${btoa(
            e.target.result
          )}`
        )
      }
      reader.readAsBinaryString(this.state.fileSelected)
    })
  }
  getTags = tags => {
    if (tags) {
      return tags.map(tag => {
        tag = JSON.parse(tag)
        delete tag.__typename
        return tag
      })
    }
    return []
  }
  async saveItem(values, addItem, form) {
    const {
      validity,
      files: [file]
    } = this.fileInput.current

    if (!validity.valid) return
    const tags = this.getTags(values.tags)
    try {
      const itemData = {
        ...values,
        tags
      }
      await addItem.mutation({
        variables: {
          item: itemData,
          image: file
        }
      })
      this.setState({ done: true })
      this.props.resetNewItem()
      this.props.resetImage()
      form.reset()
    } catch (e) {
      console.log(e)
    }
  }
  dispatchUpdate(values, updateNewItem) {
    if (!values.imageurl && this.state.fileSelected) {
      this.getBase64Url().then(imageurl => {
        updateNewItem({
          imageurl
        })
      })
    }

    const tags = this.getTags(values.tags)
    updateNewItem({
      ...values,
      tags
    })
  }
  handleImageSelect(event) {
    this.setState({ fileSelected: event.target.files[0] })
  }

  render() {
    const { resetImage, updateNewItem, resetNewItem, classes } = this.props
    const { fileSelected } = this.state
    return (
      <ItemsContainer>
        {({ tagData: { loading, error, data }, addItem }) => {
          if (loading) {
            return 'Content Loading...'
          }
          if (error) {
            return `error: ${error.message}`
          }
          return (
            <Form
              onSubmit={values => {
                this.saveItem(values, addItem)
              }}
              validate={validate}
              render={({ handleSubmit, pristine, invalid, values, form }) => (
                <form onSubmit={() => handleSubmit(form)}>
                  <FormSpy
                    subscription={{ values: true }}
                    component={({ values }) => {
                      if (values) {
                        this.dispatchUpdate(values, updateNewItem)
                      }
                      return ''
                    }}
                  />
                  <FormControl>
                    <Field
                      name="imageurl"
                      render={({ input, meta }) => (
                        <Fragment>
                          <Button
                            variant="contained"
                            color={fileSelected ? 'default' : 'primary'}
                            variant={fileSelected ? 'outlined' : 'contained'}
                            onClick={
                              fileSelected
                                ? () => {
                                    this.setState({ fileSelected: false })
                                    this.fileInput.current.value = ''
                                    resetImage()
                                  }
                                : () => {
                                    this.fileInput.current.click()
                                  }
                            }
                          >
                            {fileSelected ? 'Remove Image' : 'Select an image'}
                          </Button>
                          <input
                            type="file"
                            accept="image/*"
                            hidden
                            ref={this.fileInput}
                            onChange={event => {
                              this.handleImageSelect(event)
                            }}
                          />
                        </Fragment>
                      )}
                    />
                  </FormControl>
                  <FormControl>
                    <Field name="title">
                      {({ input, meta }) => (
                        <Fragment>
                          <TextField placeholder="Name your Item" {...input} />
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
                  <FormControl>
                    <Field name="description">
                      {({ input, meta }) => (
                        <Fragment>
                          <TextField
                            placeholder="Describe your Item"
                            multiline
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
                  {data.tags &&
                    data.tags.map(tag => (
                        <Field
                          key={tag.id}
                          name="tags"
                          type="checkbox"
                          value={JSON.stringify(tag)}
                        >
                          {({ input, meta }) => (
                            <Fragment>
                              <InputLabel>
                                <Checkbox {...input} />
                                {tag.title}
                              </InputLabel>
                              {console.log(meta)}
                              {meta.error &&
                                meta.touched && (
                                  <Typography className={classes.errorMessage}>
                                    {meta.error}
                                  </Typography>
                                )}
                            </Fragment>
                          )}
                        </Field>
                    ))}
                  <FormControl>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={ invalid || pristine || !fileSelected}
                    >
                      Share
                    </Button>
                  </FormControl>
                </form>
              )}
            />
          )
        }}
      </ItemsContainer>
    )
  }
}

ShareItemForm.propTypes = {
  resetImage: PropTypes.func.isRequired,
  updateNewItem: PropTypes.func.isRequired,
  resetNewItem: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  updateNewItem(item) {
    dispatch(updateNewItem(item))
  },
  resetNewItem() {
    dispatch(resetNewItem())
  },
  resetImage() {
    dispatch(resetImage())
  }
})

export default connect(
  undefined,
  mapDispatchToProps
)(withStyles(styles)(ShareItemForm))
