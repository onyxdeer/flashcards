import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../actions/handleChange'

class bentoInfo extends React.Component {
  render() {
    return (
     <div className="inner-contact">
                <div className="contact-form">
                    <form id="contact-us">
                        <div className="col-xs-6 wow animated slideInLeft" data-wow-delay=".5s">
                            <label>Name</label>
                            <input type="text" name="name" id="name" required="required" value={this.props.bento.name} className="form" placeholder="Name" onChange = {(event) => {this.props.handleChange(event)}}/>
                            <label>Category</label>
                            <input type="text" name="category" id="subject" required="required" value={this.props.bento.category} className="form" placeholder="Subject" onChange = {(event) => {this.props.handleChange(event)}}/>
                        </div>
                        <div className="col-xs-6 wow animated slideInRight" data-wow-delay=".5s">
                            <label>Description</label>
                            <textarea name="description" id="message" className="form textarea" value={this.props.bento.description} placeholder="Description" onChange = {(event) => {this.props.handleChange(event)}}></textarea>
                        </div>
                        <div className="ops-div relative fullwidth col-xs-12">
                        </div>
                        <div className="clear"></div>
                    </form>
                            <button  id="submit" name="submit" className="form-btn semibold pull-right" onClick={this.props.handleSubmit}>Save Bento</button> 

                    <div className="mail-message-area">
                        <div className="alert gray-bg mail-message not-visible-message">
                            <strong>Thank You !</strong> Your email has been delivered.
                        </div>
                    </div>
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



export default connect(mapStateToProps, actions)(bentoInfo);