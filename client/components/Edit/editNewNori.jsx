import React from 'react' 
import NewNoriRTE from './NewNoriRTE.jsx'

//redux dependencies
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../../actions/editPageActions.js'


class editNewNori extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <center className="new-nori">
        <div className='nori-textarea'>
          <NewNoriRTE side = 'Front' number = {this.props.number}/>
          </div>
          <div className='nori-textarea'>
          <NewNoriRTE side = 'Back'  number  = {this.props.number} />
          </div>
          <center className="add-delete-nori">
      <button type="submit" className="btn add-nori-button"  onClick={() => {this.props.handleAddNewNori(this.props.bento, this.props.number)}}>Add</button>
      <button type="submit" className="btn add-nori-button" value={this.props.number}  onDoubleClick= {() => 
        {this.props.handleDeleteNori(this.props.bento, this.props.number)}
        }>Del</button>
      </center>
      </center> 
    );
  }
}

function mapStateToProps (state) {
  return {
    bento: state.editBentoInfo
  }
}

export default connect(mapStateToProps, actions)(editNewNori)