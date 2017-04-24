import React, {Component} from 'react';
import {connect} from 'react-redux'
import * as actions from '../../actions/editPageActions.js'


class editBentoInfo extends React.Component {
  render() {
    return (
     <div className="inner-contact" >
                <div className="md-form">
                    {/*<form id="contact-us">*/}
                        <div className="col-xs-6 wow animated slideInLeft" data-wow-delay = ".4s">
                            <input type="text" name="name" id="name" required="required" value={this.props.bento.name} className="form-control"  placeholder="Bento Name" onChange = {(event) => {this.props.handleChange(event)}}/>
                            {/*<label for="form1" class="">Name</label>*/}
                            {/*<input type="text" name="category" id="subject" required="required" value={this.props.bento.category} className="form-control" placeholder="Subject" onChange = {(event) => {this.props.handleChange(event)}}/>*/}
                            {/*<label for="form1" class="">Category</label>*/}
                        </div>
                        <div className="col-xs-6 wow animated slideInRight" data-wow-delay = ".4s">
                            {/*<label>Description</label>*/}
                            <textarea name="description" id="message" className="form textarea" value={this.props.bento.description} placeholder="Description" onChange = {(event) => {this.props.handleChange(event)}}></textarea>
                        </div>
                        <div className="ops-div relative fullwidth col-xs-12">
                        </div>
                        <div className="clear"></div>
                    {/*</form>*/}
                            <button  id="submit" name="submit" className="btn btn-default form-btn semibold pull-right wow animated slideInRight" data-wow-delay = ".9s" onClick={() =>{this.props.handleSaveBento(this.props.bento)}}>Save Bento</button> 
                </div>
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