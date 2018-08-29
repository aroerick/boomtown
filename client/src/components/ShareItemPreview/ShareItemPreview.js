import React from 'react'
import ItemCard from '../ItemCard'
import { connect } from 'react-redux'
import { ViewerContext } from '../../context/ViewerProvider'

const ShareItemPreview = props => (
  <ViewerContext.Consumer>
    {({ loading, error, viewer }) => {
      props.shareItemPreview.itemowner = {
        email: viewer.email,
        fullname: viewer.fullname
      }
    return <ItemCard item={props.shareItemPreview} />}}
  </ViewerContext.Consumer>
)
//

const mapStateToProps = state => {
  return {
    shareItemPreview: state.shareItemPreview
  }
}

export default connect(mapStateToProps)(ShareItemPreview)
