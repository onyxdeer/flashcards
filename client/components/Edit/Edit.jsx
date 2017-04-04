import React from 'react';
import NewBentoInfo from './NewBentoInfo.jsx'
import NewNori from './NewNori.jsx'
import RichTextEditor from 'react-rte';
import {convertFromRaw, convertToRaw} from 'draft-js'

class Edit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bento : {
        name: '',
        description:'',
        category: '',
        noris: [{Front: null, Back: null}, {Front: null, Back: null}]
      },
      value: RichTextEditor.createEmptyValue()
    }
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNoriChange = this.handleNoriChange.bind(this);
    this.addNewNori = this.addNewNori.bind(this);
    this.deleteNori = this.deleteNori.bind(this);
  }

  // handleTagChange(event) {
  //   this.setState({})
  // }

  handleChange(event) {
    var tempBento = this.state.bento;
    tempBento[event.target.name] = event.target.value
    this.setState({
      bento : tempBento
    });
  }

  // handleSubmit(event) {
  //   event.preventDefault();
  // }

  handleNoriChange(value, side, index) {
    var data = JSON.stringify(value._editorState.getCurrentContent());
    var tempBento = this.state.bento
    tempBento.noris[index][side] = data;
    this.setState({
      bento: tempBento
    })
  }

  addNewNori () {
    console.log("adding a new nori")
    var newNori = {Front:null, Back:null}
    var tempBento = this.state.bento;
    tempBento.noris.push(newNori);
    this.setState({
      bento: tempBento
    })
  }

  deleteNori(event) {
    var tempBento = this.state.bento;
    tempBento.noris.splice(event.target.value, 1)
    this.setState({
      bento:tempBento
    })
  }

  componentWillMount() {
    // send an DB GET request for the flash cards here
  }

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
          <NewNori key={index} number = {index} nori = {nori} addNewNori = {this.addNewNori} deleteNori = {this.deleteNori} handleNoriChange = {this.handleNoriChange}/>
        )}
        <div className="ops-div relative fullwidth col-xs-12">
          <button type="submit" id="submit" name="submit" className="form-btn semibold pull-right">Save Bento</button> 
        </div>
      </div>
    )
  }
}

export default Edit;