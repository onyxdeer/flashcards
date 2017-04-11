import React from 'react' 
import NewNoriRTE from './NewNoriRTE.jsx'

//redux dependencies
import {convertFromRaw, convertToRaw} from 'draft-js'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../../actions/editPageActions.js'



class NewNori extends React.Component {
  render() {
    return (
      <center className="new-nori">
        <div className='nori-textarea'>
          <NewNoriRTE side = 'Front' handleNoriChange = {this.props.handleNoriChange} nori = {this.props.nori["Front"]} number = {this.props.number}/>
          </div>
          <div className='nori-textarea'>
          <NewNoriRTE side = 'Back' handleNoriChange = {this.props.handleNoriChange} nori ={this.props.nori["Back"]} number  = {this.props.number} />
          </div>
          <center className="add-delete-nori">
      <button type="submit" className="btn add-nori-button"  onClick={this.props.addNewNori}>Add</button>
      <button type="submit" className="btn add-nori-button" value={this.props.number}  onDoubleClick={this.props.deleteNori}>Del</button>
      </center>
      </center> 
    );
  }
}

export default connect(actions)(NewNori)