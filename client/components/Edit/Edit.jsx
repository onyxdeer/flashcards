import React from 'react';
import EditBentoInfo from './editBentoInfo.jsx'
import EditNewNori from './editNewNori.jsx'
//redux dependencies
import {convertFromRaw, convertToRaw} from 'draft-js'
import {connect} from 'react-redux'
import * as actions from '../../actions/editPageActions.js'
//miscellaneous dependencies
import axios from 'axios'
import RichTextEditor, {EditorValue} from 'react-rte';
class Edit extends React.Component {
  render() {
    return (
      <div>
        <div className="create-title">
          <h1 className="default-font">Create Bento</h1>
        </div>
        <div className="relative fullwidth">
        </div>
        <div className="newbentoinfo">
          <EditBentoInfo />
        </div>
        <hr />
        {this.props.bento.noris.map((nori, index) => 
          <EditNewNori key={index} number = {index} />
        )}
        <div className="ops-div relative fullwidth col-xs-12">
          <button type="submit" id="submit" name="submit" className="btn btn-default form-btn semibold pull-right animated slideInRight" data-delay = ".9s" onClick ={() => {this.props.handleSaveBento(this.props.bento)}}>Save Bento</button> 
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    bento: state.editBentoInfo
  }
}

export default connect(mapStateToProps, actions)(Edit);