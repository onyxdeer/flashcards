import React, {Component} from 'react';
import {connect} from 'react-redux'
import * as actions from '../../actions/editPageActions.js'
import Imgur from "../../imgur.js";

class imageDropzone extends React.Component {
  componentDidMount() {
      var callback = res =>  {
        if (res.success === true) {
            console.log(res.data.link);
            this.props.handleImageUpload(this.props.bento.noris, res.data.link, this.props.number)
        }
    };

    new Imgur({
        clientid: '8887909661837b4',
        callback: callback
    });
}
  render() {
    console.log(this.props.bento, this.props.number)
    if(this.props.bento.noris[this.props.number]["Front"]["image"]) {
      return (
        <img src = {this.props.bento.noris[this.props.number]["Front"]["image"]} />
      )
    } else {
      console.log(this.props.bento.noris)
      return (
        <div className='dropzone'></div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    bento: state.editBentoInfo
  }
}



export default connect(mapStateToProps, actions)(imageDropzone);