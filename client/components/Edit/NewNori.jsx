import React from 'react' 

class NewNori extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    console.log("NewNori is rendering", this.props)
    return (
      <center className="new-nori">
      <form onSubmit={this.props.handleSubmit}>
          <textarea name="message" id="message" className="form nori-textarea"  placeholder="Front"></textarea>
          <textarea name="message" id="message" className="form nori-textarea"  placeholder="Back"></textarea>
      </form>
      <button type="submit" className="btn add-nori-button"  onClick={this.props.addNewNori}>Add</button>
      <button type="submit" className="btn add-nori-button" value={this.props.number}  onDoubleClick={this.props.deleteNori}>Delete</button>
      </center> 
    );
  }
}

export default NewNori