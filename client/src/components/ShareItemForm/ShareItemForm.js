import React, { Component } from 'react'
import { FormSpy, Form, Field } from 'react-final-form'
import { Button, TextField, Checkbox, InputLabel } from '@material-ui/core'
import ItemsContainer from '../../containers/ItemsContainer'
import { connect } from 'react-redux'
import {
  resetImage,
  updateNewItem,
  resetNewItem
} from '../../redux/modules/ShareItemPreview'

class ShareItemForm extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  onSubmit = values => {
    console.log(values)
  }
  validate = values => {
    console.log(values)
  }

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        validate={this.validate}
        render={({ handleSubmit, pristine, invalid, values }) => (
          <form onSubmit={handleSubmit}>
            <FormSpy
              subscription={{ values: true }}
              component={({ values }) => {
                if (values) {
                  this.updateNewItem(values)
                }
                return ''
              }}
            />
            <Field
              render={({ input, meta }) => (
                <Button variant="contained" color="primary">
                  Select an image
                </Button>
              )}
            />
            <Field name="ItemName">
              {({ input, meta }) => (
                <TextField placeholder="Name your Item" {...input} />
              )}
            </Field>
            <Field name="Description">
              {({ input, meta }) => (
                <TextField
                  placeholder="Describe your Item"
                  multiline
                  {...input}
                />
              )}
            </Field>
            <ItemsContainer>
              {({ tagData: { tags, loading, error } }) => {
                if (loading) {
                  return 'Content Loading...'
                }
                if (error) {
                  return `error: ${error.message}`
                }
                return tags.map(tag => (
                  <Field
                    key={tag.id}
                    name="tags"
                    type="checkbox"
                    value={JSON.stringify(tag)}
                  >
                    {({ input, meta }) => (
                      <InputLabel>
                        <Checkbox {...input} />
                        {tag.title}
                      </InputLabel>
                    )}
                  </Field>
                ))
              }}
            </ItemsContainer>
            <Field
              render={({ input, meta }) => (
                <Button type="submit" variant="contained" color="primary">
                  Share
                </Button>
              )}
            />
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    )
  }
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
)(ShareItemForm)
