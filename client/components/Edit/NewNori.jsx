import React from 'react' 
import RichTextEditor from 'react-rte';
import NewNoriRTE from './NewNoriRTE.jsx'
class NewNori extends React.Component {
  constructor(props){
    super(props)
      this.state = {
        value: RichTextEditor.createEmptyValue(),
        secondValue: RichTextEditor.createEmptyValue(),
      }
      this.onChange = this.onChange.bind(this);
  }

  onChange (value) {
    this.setState({value});
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(
        value.toString('html')
      ); 
    }
  };

  render() {

    return (
      <center className="new-nori">
        <div className='nori-textarea'>
          <NewNoriRTE side = 'Front'/>
          </div>
          <div className='nori-textarea'>
          <NewNoriRTE side = 'Back'/>
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