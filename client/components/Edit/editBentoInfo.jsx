import React, {Component} from 'react';
import {connect} from 'react-redux'
import * as actions from '../../actions/editPageActions.js'
import Imgur from '../../imgur.js'

class editBentoInfo extends React.Component {
  constructor(props){
    super(props)
      this.state = {
        imgurInstance: false
      }
      this.instantiateCoverImgurInstance = this.instantiateCoverImgurInstance.bind(this);
      this.callback = this.callback.bind(this);
      this.switchImgurInstance = this.falseImgurInstance.bind(this)
  }
    callback (res) {
        if (res.success === true) {
            this.props.handleImageUpload(this.props.bento, res.data.link);
            this.setState({
              imgurInstance: false
            })
        }
    };

    falseImgurInstance (){
      this.setState({
        imgurInstance: false
      })
    }


    instantiateCoverImgurInstance () {
    console.log("instantiating new imgur instance for cover")
    new Imgur({
      clientid: '8887909661837b4',
      callback: this.callback,
      index: 'cover'
    })
    this.setState ({
      imgurInstance: true
    })
  }

    componentDidUpdate () {
    console.log("component ", this.props.number, " did update!  ", "image url: ", this.props.bento.cover.url )
    if(!this.state.imgurInstance && this.props.bento.cover.url === null) {
      console.log("component is instantiating and imgur instance")
      this.instantiateCoverImgurInstance();
    }
  }

    componentDidMount() {
    if(!this.state.imgurInstance && this.props.bento.cover.url === null){
    console.log("line 28 image dropzone mounts and imgur instantiated")
    this.instantiateCoverImgurInstance()
    }
}

  render() {
    return (
      <div className="inner-contact md-form">
        {/*<div className="md-form">*/}
            {/*<form id="contact-us">*/}

          <div className="leftInfo wow animated slideInLeft" data-wow-delay=".4s">

            <label className="active editPlaceholder">Bento Name</label>
            <input type="text" name="name" id="form1" required="required" value={this.props.bento.name} className="form-control focusedInput bentoNameField" onChange={(event) => {this.props.handleChange(event)}} />

            {/*<input type="text" name="category" id="subject" required="required" value={this.props.bento.category} className="form-control" placeholder="Subject" onChange = {(event) => {this.props.handleChange(event)}}/>*/}
            {/*<label for="form1" class="">Category</label>*/}

            {this.props.bento.cover.url ? 
            <section className="img-fluid cover-image-fluid" style={{display: 'flex', flexDirection: 'column', height: '230px', alignItems: 'center'}}>
              <img className="img-fluid cover-image-fluid" src={this.props.bento.cover.url} />
              <button onClick={() => {this.props.handleImageDeletion(this.props.bento, "cover"), this.falseImgurInstance()}} className="btn btn-default btn-sm cover-edit-image">delete</button>
            </section> : <div className={'editPlaceholder dropzone' + ' dzcover'}></div>}

          </div>

          <div className="rightInfo wow animated slideInRight" data-wow-delay=".4s">
            {/*<label>Description</label>*/}
            <textarea name="description" id="message" className="bentoDescriptionInEdit form textarea editPlaceholder" value={this.props.bento.description} placeholder="Description" onChange={(event) => {this.props.handleChange(event)}}></textarea>
            <button  id="submit" name="submit" className="btn btn-default form-btn semibold animated slideInRight" data-delay=".9s" onClick={() =>{this.props.handleSaveBento(this.props.bento)}}>Save Bento</button> 
          </div>

        {/*</div>*/}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    bento: state.editBentoInfo
  }
}



export default connect(mapStateToProps, actions)(editBentoInfo);