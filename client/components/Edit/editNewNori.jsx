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
      <div style={{display: 'flex'}}>
      <div className="new-nori wow animated rollIn" data-wow-delay = "0.3s"style = {{display: 'flex', justifyContent: 'center'}}>
        <div style = {{ minWidth: 240}}>
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
      <button type="submit" className="btn btn-default add-nori-button"  onClick={() => {this.props.handleAddNewNori(this.props.bento, this.props.number)}}>Add</button>
      <button type="submit" className="btn btn-default add-nori-button"  value={this.props.number}  onClick= {() => 
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