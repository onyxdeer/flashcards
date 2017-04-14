import React from 'react' 
import EditNewNoriRTE from './editNewNoriRTE.jsx'
import ImageDropzone from './imageDropzone.jsx'
//redux dependencies
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../../actions/editPageActions.js'
class editNewNori extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      url: ''
    }
    this.uploadImage = this.uploadImage.bind(this)
  }


uploadImage (url) {
  this.setState({url: url})
}



// componentDidMount() {
//       var callback = function (res) {
//         if (res.success === true) {
//             console.log(res.data.link);
//         }
//     };

//     new Imgur({
//         clientid: '8887909661837b4',
//         callback: callback
//     });
// }
  render() {
    return (
      <div>
      <center className="new-nori">
        <div className='nori-textarea'>
          <ImageDropzone />
          <EditNewNoriRTE side = 'Front' number = {this.props.number}/>
          </div>
          <div className='nori-textarea'>
          <EditNewNoriRTE side = 'Back'  number  = {this.props.number} />
          </div>
          <center className="add-delete-nori">
      <button type="submit" className="btn add-nori-button"  onClick={() => {this.props.handleAddNewNori(this.props.bento, this.props.number)}}>Add</button>
      <button type="submit" className="btn add-nori-button" value={this.props.number}  onDoubleClick= {() => 
        {this.props.handleDeleteNori(this.props.bento, this.props.number)}
        }>Del</button>
      </center>
      </center> 
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    bento: state.editBentoInfo
  }
}

export default connect(mapStateToProps, actions)(editNewNori)