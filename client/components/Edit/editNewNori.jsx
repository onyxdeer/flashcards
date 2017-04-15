import React from 'react' 
import EditNewNoriRTE from './editNewNoriRTE.jsx'
import ImageDropzone from './imageDropzone.jsx'
//redux dependencies
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../../actions/editPageActions.js'
class editNewNori extends React.Component {
  render() {
    return (
      <div>
      <center className="new-nori">
        <div className='nori-textarea'>
          <ImageDropzone number = {this.props.number}/>
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