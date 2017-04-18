import React, {Component} from 'react';
import {connect} from 'react-redux'
import * as actions from '../../actions/editPageActions.js'
import Imgur from "../../imgur.js";

class imageDropzone extends React.Component {
  constructor(props) {
    super(props)
    this.callback = this.callback.bind(this)
  }
  callback (res) {
    console.log("This function fires at component number ", this.props.number, res.data.link )
        if (res.success === true) {
            this.props.handleImageUpload(this.props.bento.noris, res.data.link, this.props.number)
        }
    };

  componentDidUpdate(){
        new Imgur({
        clientid: '8887909661837b4',
        callback: this.callback,
        index: this.props.number
    })
    return true
  }

  componentDidMount() {
    new Imgur({
        clientid: '8887909661837b4',
        callback: this.callback,
        index: this.props.number
    })
}
  render() {
    (console.log(this.props))
    if(this.props.bento.noris[this.props.number]["Front"]["image"]) {
      return (
        <img className={"nori-image"} src = {this.props.bento.noris[this.props.number]["Front"]["image"]}/>
      )
    } else {
      console.log(this.props.bento.noris)
      return (
        <div className={'dropzone'  + ' dz' + this.props.number}></div>
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