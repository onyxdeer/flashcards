import React from 'react';
import NewBentoInfo from './NewBentoInfo.jsx'
import NewNori from './NewNori.jsx'

class Edit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bento : {
        title: '',
        tags: [],
        description:'',
        noris: [{front: null, back: null}, {front: null, back: null}]
      },
    }
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleTagChange(event) {
  //   this.setState({})
  // }

  // handleChange(event) {
  //   this.setState({});
  // }

  // handleSubmit(event) {
  //   event.preventDefault();
  // }

  render() {
    return (
      <div>
        <div className="relative fullwidth">
        <h1 className="create-title">Create A New Bento</h1>
        </div>
        <div className="newbentoinfo">
        <NewBentoInfo bento = {this.state.bento} handleChange = {this.handleChange}/>
        </div>
        {this.state.bento.noris.map((nori, index) => 
          <NewNori key= {index} nori = {nori}/>
        )}
        <div className="ops-div relative fullwidth col-xs-12">
          <button type="submit" id="submit" name="submit" className="form-btn semibold pull-right">Save Bento</button> 
        </div>
      </div>
    )
  }
}

export default Edit;