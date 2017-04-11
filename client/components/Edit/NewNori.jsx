import React from 'react' 
import RichTextEditor from 'react-rte';
import NewNoriRTE from './NewNoriRTE.jsx'
class NewNori extends React.Component {
  constructor(props){
    super(props)
      this.state = {
      }
  }

  render() {

    return (
      <center className="new-nori">
        <div className='nori-textarea'>
          <NewNoriRTE side = 'Front' handleNoriChange = {this.props.handleNoriChange} nori = {this.props.nori["Front"]} number = {this.props.number}/>
          </div>
          <div className='nori-textarea'>
          <NewNoriRTE side = 'Back' handleNoriChange = {this.props.handleNoriChange} nori ={this.props.nori["Back"]} number  = {this.props.number} />
          </div>
          <center className="add-delete-nori">
      <button type="submit" className="btn add-nori-button"  onClick={this.props.addNewNori}>Add</button>
      <button type="submit" className="btn add-nori-button" value={this.props.number}  onDoubleClick={this.props.deleteNori}>Del</button>
      </center>
      </center> 
    );
  }
}

export default NewNori