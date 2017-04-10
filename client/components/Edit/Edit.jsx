import React from 'react';
import NewBentoInfo from './NewBentoInfo.jsx'
import NewNori from './NewNori.jsx'
import RichTextEditor, {EditorValue} from 'react-rte';
import {convertFromRaw, convertToRaw} from 'draft-js'
import axios from 'axios'

class Edit extends React.Component {
  constructor(props) {
    super(props);

    console.log('this.props.userId:', this.props.userId);

    this.state = {
      bento : {
        name: '',
        description:'',
        category: '',
        visit_count: 0,
<<<<<<< HEAD
        bento_id: this.props.bentoId,
        user_id: this.props.userId,
=======
        bento_id: null,
        user_id: this.props.userId === 'guest' ? 1 : this.props.userId,
>>>>>>> 4d872766f8d05e45e0bcdc1ebfd7142a315a92ad
        noris: [{Front: {image: null, text:null, soundFile: null}, Back: {image: null, text:null, soundFile: null}}, {Front: {image: null, text:null, soundFile: null}, Back: {image: null, text:null, soundFile: null}}]
      },
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

<<<<<<< HEAD
  handleNoriChange(data, side, index) {
    console.log(data)
    console.log("Line 60 from Edit parent", data)
    var tempBento = this.state.bento
=======
  handleNoriChange(value, side, index) {
    var data = JSON.stringify(convertToRaw(value._editorState.getCurrentContent()));
    var tempBento = this.state.bento;
>>>>>>> 4d872766f8d05e45e0bcdc1ebfd7142a315a92ad
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
  
  // componentWillReceiveProps(newProp) {
  //   console.log("Does Edit receive props:", newProp)
  //   if(newProp.userId != this.state.bento.user_id) {
  //     var tempBento = this.state.bento
  //     tempBento.user_id = newProp.userId
  //     this.setState({bento: tempBento})
  //   }
  // }

  componentWillMount() {
<<<<<<< HEAD
    console.log('componentWillMount fires from Edit Parent', this.props, this.props.match);
    var context = this;
    var tempBento = this.state.bento;
    tempBento.bento_id = Number(this.props.bentoId);
=======
    // send an DB GET request for the flash cards here
    var context = this;
    var tempBento = this.state.bento;
>>>>>>> 4d872766f8d05e45e0bcdc1ebfd7142a315a92ad
    if (this.props.userId === 'guest') {
      tempBento.user_id = 1;
      this.setState({
        bento: tempBento
      }, () => console.log('bento (guest) is now:', context.state.bento));
    } else {
<<<<<<< HEAD
      tempBento.user_id = this.state.userId;
=======
      tempBento.user_id = Number(this.props.userId)
>>>>>>> 4d872766f8d05e45e0bcdc1ebfd7142a315a92ad
      this.setState({
        bento: tempBento
      }, () => console.log('bento is now:', context.state.bento));
    }
    if(tempBento.bento_id){
      console.log(tempBento.bento_id, tempBento.user_id)
      axios.get('/api/bentos', {params :{id: tempBento.bento_id, user_id: tempBento.user_id}})
      .then((response) => {
        console.log("Line 104",   response.data[0])
        var data = response.data[0]; 
        tempBento.name = data.name;
        tempBento.description = data.description;
        this.setState({
          bento: tempBento
        }, () => console.log('bento is now populated with', context.state.bento))
      })
      .then(() =>{
        axios.get('/api/bentos_noris', {params: {bento_id: tempBento.bento_id}})
        .then((response) => {
          console.log("Retrieving all noris of bento", response.data)
          return  response.data.map(function(data){
            return data.nori_id;
          })
        })
        .then((reqNoriArr) =>{
          axios.get('/api/noris', {params: {id : reqNoriArr}})
          .then((response) => {
            console.log("What am I holding onto", response.data)
            var savedNorisArray = response.data.map(function(nori){
              var newNori = {Front: {image: null, text:null, soundFile: null}, Back: {image: null, text:null, soundFile: null}}
              newNori.Front.text = nori.text_front;
              newNori.Back.text = nori.text_back;
              newNori.Front.soundFile = nori.audio_url_front;
              newNori.Back.soundFile = nori.audio_url_back;
              return newNori
            })
            tempBento.noris = savedNorisArray;
            this.setState({
              bento: tempBento 
            }, () => {console.log(this.state)})
          })
        })
      })
    }
  }

  render() {
    return (
      <div>
        <div className="relative fullwidth">
          <h1 className="create-title">Create A New Bento</h1>
        </div>
        <div className="newbentoinfo">
          <NewBentoInfo bento = {this.state.bento} handleChange = {this.handleChange} handleSubmit = {this.handleSubmit}/>
        </div>
        {this.state.bento.noris.map((nori, index) => 
          <NewNori key={index} number = {index} nori = {nori} addNewNori = {this.addNewNori} deleteNori = {this.deleteNori} handleNoriChange = {this.handleNoriChange}
           />
        )}
        <div className="ops-div relative fullwidth col-xs-12">
          <button type="submit" id="submit" name="submit" className="form-btn semibold pull-right" onClick = {this.handleSubmit}>Save Bento</button> 
        </div>
      </div>
    )
  }
}

export default Edit;