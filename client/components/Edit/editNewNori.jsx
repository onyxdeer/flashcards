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
      deleted: false
    }
    this.gettingDeleted = this.gettingDeleted.bind(this)
  }

  gettingDeleted () {
    this.setState({
      deleted: true
    })
    setTimeout(function(){this.props.handleDeleteNori(this.props.bento, this.props.number)}.bind(this), 1000)
  }

  render() {

    var style = {
      display: 'flex',
      justifyContent: 'center'
    };

    if (this.state.deleted) {
      style['animationName'] = 'fadeOutRight';
    }
    
    return (
        <div className={"new-nori wow animated slideInLeft"} data-wow-delay = {0.5} data-wow-duration= "1.5s" style = {style}>

            <div className="edit-nori-outer-div" style={{display: 'flex', flexFlow: 'column', justifyContent: 'space-between' }}>
              <div className="edit-nori-right" style={{display: 'flex', flexFlow: 'row wrap'}}>

                <ImageDropzone number={this.props.number} />

                <div className="rteArea">

                  <div className="row textFieldSection">
                    <div className='nori-textarea'>
                      <EditNewNoriRTE side='Front' number={this.props.number} />
                    </div>
                    <div className='nori-textarea'>
                      <EditNewNoriRTE side='Back'  number={this.props.number} />
                    </div>
                  </div>

                  <div className="row addDeleteSection">
                    <div className="add-delete-nori" style={{display: 'flex', justifyContent:'center'}}>
                      <button type="submit" className="btn btn-default add-nori-button" onClick={() => {this.props.handleAddNewNori(this.props.bento, this.props.number)}}><i className="fa fa-plus" aria-hidden="true"></i></button>
                      <button type="submit" className="btn btn-default add-nori-button" value={this.props.number} onClick= {() => {this.gettingDeleted();}}><i className="fa fa-minus" aria-hidden="true"></i></button>
                    </div>
                  </div>

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