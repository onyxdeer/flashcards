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
      <div className="new-nori animated slideInLeft" data-wow-delay=".4s" style = {{display: 'flex', justifyContent: 'center'}}>
        <div style = {{flex: "flex-start", minWidth: 210}}>
          <ImageDropzone number = {this.props.number}/>
        </div>
        <div className="nori-edit-right" style = {{display: 'flex', flexFlow: 'column', justifyContent: 'space-between' }}>
          <div style ={{display: 'flex', flexFlow: 'row nowrap'}}>
        <div className='nori-textarea'  >
          <EditNewNoriRTE side = 'Front' number = {this.props.number}/>
          </div>
          <div className='nori-textarea'>
          <EditNewNoriRTE side = 'Back'  number  = {this.props.number} />
          </div>
          </div>
          <div className="add-delete-nori" style = {{display: 'flex', justifyContent:'flex-end'}}>
      <button type="submit" className="btn add-nori-button"  onClick={() => {this.props.handleAddNewNori(this.props.bento, this.props.number)}}>Add</button>
      <button type="submit" className="btn add-nori-button" value={this.props.number}  onClick= {() => 
        {this.props.handleDeleteNori(this.props.bento, this.props.number)}
        }>Del</button>
        </div>
      </div>
      </div> 
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