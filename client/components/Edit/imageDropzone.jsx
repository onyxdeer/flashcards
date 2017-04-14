import React, {Component} from 'react';
// import {connect} from 'react-redux'
// import * as actions from '../../actions/editPageActions.js'
import Imgur from "../../imgur.js";

class imageDropzone extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        url: 'http://i.imgur.com/tVRalPZ.jpgs'
      }
  }
  componentDidMount() {
      var callback = res =>  {
        if (res.success === true) {
            console.log(res.data.link);
            this.setState({url: res.data.link})
        }
    };

    new Imgur({
        clientid: '8887909661837b4',
        callback: callback
    });
}
  render() {
    if(this.state.url) {
      return (
        <img src = {this.state.url} />
      )
    } else {
      return (
        <div className='dropzone'></div>
      )
    }
  }
}

// function mapStateToProps(state) {
//   return {
//     bento: state.editBentoInfo
//   }
// }



// export default connect(mapStateToProps, actions)(imageDropzone);
export default imageDropzone