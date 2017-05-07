import React, {Component} from 'react';
import {connect} from 'react-redux'
import * as actions from '../../actions/editPageActions.js'
import Imgur from "../../imgur.js";
class imageDropzone extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imgurInstance: false
    }
    this.callback = this.callback.bind(this);
    this.instantiateNewImgurInstance = this.instantiateNewImgurInstance.bind(this);
    this.falseImgurInstance = this.falseImgurInstance.bind(this);
  }
  callback (res) {
    console.log("This function fires at component number ", this.props.number, res.data.link )
        if (res.success === true) {
            this.props.handleImageUpload(this.props.bento, res.data.link, this.props.number);
            this.setState({
              imgurInstance: false
            }, console.log(this.props.number))
        }
    };

  falseImgurInstance (){
    this.setState({
      imgurInstance: false
    })
  }
  instantiateNewImgurInstance () {
    console.log("instantiating new imgur instance")
    new Imgur({
      clientid: '8887909661837b4',
      callback: this.callback,
      index: this.props.number
    })
    this.setState ({
      imgurInstance: true
    })
  }

  componentDidUpdate () {
    console.log("component ", this.props.number, " did update!  ", "image url: ", this.props.bento.noris[this.props.number]["Front"]["image"] )
    if(!this.state.imgurInstance && this.props.bento.noris[this.props.number]["Front"]["image"] === null) {
      console.log("component is instantiating and imgur instance")
      this.instantiateNewImgurInstance();
    }
  }

  componentDidMount() {
    if(!this.state.imgurInstance && this.props.bento.noris[this.props.number]["Front"]["image"] === null){
    console.log("line 28 image dropzone mounts and imgur instantiated")
    this.instantiateNewImgurInstance()
    }
}
  render() {
    if(this.props.bento.noris[this.props.number]["Front"]["image"]) {
      return (
        <section className={"nori-image"}>
          <img className={"img-thumbnail"} src = {this.props.bento.noris[this.props.number]["Front"]["image"]} />
          <button className={"btn btn-default btn-sm"} onClick = {() => {this.props.handleImageDeletion(this.props.bento, this.props.number), this.falseImgurInstance()}}>delete</button>
        </section>
      )
    } else {
      return (
        <div className={'editPlaceholder dropzone' + ' dz' + this.props.number}></div>
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