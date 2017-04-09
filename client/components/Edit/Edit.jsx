import React from 'react';
import NewBentoInfo from './NewBentoInfo.jsx'
import NewNori from './NewNori.jsx'
import RichTextEditor from 'react-rte';
import {convertFromRaw, convertToRaw} from 'draft-js'
import axios from 'axios'

class Edit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bento : {
        name: '',
        description:'',
        category: '',
        visit_count: 0,
<<<<<<< HEAD
        bento_id: 6,
        user_id: null,
=======
        bento_id: null,
        user_id: 1,
>>>>>>> bento_id state is updated after save request
        noris: [{Front: {image: null, text:null, soundFile: null}, Back: {image: null, text:null, soundFile: null}}, {Front: {image: null, text:null, soundFile: null}, Back: {image: null, text:null, soundFile: null}}]
      },
      userId: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNoriChange = this.handleNoriChange.bind(this);
    this.addNewNori = this.addNewNori.bind(this);
    this.deleteNori = this.deleteNori.bind(this);
  }

  handleChange(event) {
    var tempBento = this.state.bento;
    tempBento[event.target.name] = event.target.value
    this.setState({
      bento : tempBento
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.bento.name.replace(/\s/g,'').length < 5) {
      alert("Please give your new Bento a name and make sure it's longer than 5 characters")
    } else {
      axios.post('/api/bentos',this.state.bento).then((data) => {
        if(data.status === 200) {
        var tempBento = this.state.bento
        tempBento.bento_id = data.data
          this.setState({
            bento: tempBento
         })
          alert('Your bento has been saved!')
        }else {
          alert('Your bento was unsuccessfully saved. Please try again later.')
        }
      })
    } 
  }

  handleNoriChange(value, side, index) {
    var data = JSON.stringify(value._editorState.getCurrentContent());
    var tempBento = this.state.bento
    tempBento.noris[index][side]["text"] = data;
    this.setState({
      bento: tempBento
    })
  }

  addNewNori () {
    console.log("adding a new nori")
    var newNori = {Front: {image: null, text:null, soundFile: null}, Back: {image: null, text:null, soundFile: null}, id: null}
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
    console.log('this.props.match.params:', this.props.match.params);
    // send an DB GET request for the flash cards here
    var context = this;
    var tempBento = this.state.bento;
    if (this.props.match.params.user_id === 'guest') {
      tempBento.user_id = 1;
      this.setState({
        bento: tempBento
      }, () => console.log('bento (guest) is now:', context.state.bento));
    } else {
      tempBento.user_id = Number(this.props.match.params.user_id)
      this.setState({
        bento: tempBento
      }, () => console.log('bento is now:', context.state.bento));
    }
  }

  render() {
    console.log("storing into bento", this.state.bento.noris, this.state.bento.bento_id)
    return (
      <div>
        <div className="relative fullwidth">
          <h1 className="create-title">Create A New Bento</h1>
        </div>
        <div className="newbentoinfo">
          <NewBentoInfo bento = {this.state.bento} handleChange = {this.handleChange} handleSubmit = {this.handleSubmit}/>
        </div>
        {this.state.bento.noris.map((nori, index) => 
          <NewNori key={index} number = {index} nori = {nori} addNewNori = {this.addNewNori} deleteNori = {this.deleteNori} handleNoriChange = {this.handleNoriChange}/>
        )}
        <div className="ops-div relative fullwidth col-xs-12">
          <button type="submit" id="submit" name="submit" className="form-btn semibold pull-right" onClick = {this.handleSubmit}>Save Bento</button> 
        </div>
      </div>
    )
  }
}

export default Edit;