import React, {Component} from 'react';
import {connect} from 'react-redux'
import * as actions from '../../actions/editPageActions.js'
import Imgur from "../../imgur.js";

class imageDropzone extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imgurInstance : false
    }
    this.callback = this.callback.bind(this);
  }
  callback (res) {
    console.log("This function fires at component number ", this.props.number, res.data.link )
        if (res.success === true) {
            this.setState({
              imgurInstance: false
            }, console.log(this.props.number))
            this.props.handleImageUpload(this.props.bento.noris, res.data.link, this.props.number);
        }
    };

  shouldComponentUpdate(nextProps, nextState) {
    console.log("dropzone component "+this.props.number+" shouldComponentUpdate. The imgur state is:  " + this.state.imgurInstance)
      // if(!this.props.bento.noris[this.props.number]["Front"]["image"]){
      //     new Imgur({
      //       clientid: '8887909661837b4',
      //       callback: this.callback,
      //       index: this.props.number
      //     })
      //     return true
      // }
  }


  componentWillReceiveProps(nextProps) {
    console.log("dropzone component "+this.props.number+" willReceiveProps. The imgur state is:  " + this.state.imgurInstance)
  }  

  componentDidUpdate(){
    console.log("dropzone component "+this.props.number+" did updated. The imgur state is:  " + this.state.imgurInstance)
      // if(!this.state.imgurInstance){
      // } else if (this.state.imgurInstance && !this.props.bento.noris[this.props.number]["Front"]["image"]){
      //     new Imgur({
      //       clientid: '8887909661837b4',
      //       callback: this.callback,
      //       index: this.props.number
      //     })
      // }
    console.log("this is prev  props: " + this.props.bento.noris[this.props.number]["Front"]["image"])
    console.log("this is the next  props: " + nextProps.bento.noris[this.props.number]["Front"]["image"])
      if(!this.props.bento.noris[this.props.number]["Front"]["image"]){
        console.log("Do i fire?")
          new Imgur({
            clientid: '8887909661837b4',
            callback: this.callback,
            index: this.props.number
          })
      }
        return true
  }

  componentDidMount() {
    console.log("line 28 image dropzone mounts")
    new Imgur({
        clientid: '8887909661837b4',
        callback: this.callback,
        index: this.props.number
    })
    this.setState({
      imgurInstance: true
    })
}
  render() {
    if(this.props.bento.noris[this.props.number]["Front"]["image"]) {
      return (
        <img className={"nori-image img-thumbnail"} src = {this.props.bento.noris[this.props.number]["Front"]["image"]}/>
      )
    } else {
      console.log("I have rendered")
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