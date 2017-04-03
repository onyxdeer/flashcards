import React, {Component, PropTypes} from 'react';
import RichTextEditor from 'react-rte';

class NewNoriRTE extends Component {
constructor(props){
  super(props)  
  this.state = {
    value: RichTextEditor.createEmptyValue(),
    showTB : false
  }
  this.onChange = this.onChange.bind(this)
  this.onFocus = this.onFocus.bind(this)
  this.onBlur = this.onBlur.bind(this)
}

  onFocus (){
    this.setState({
      showTB : true
    })
  }

  onBlur () {
    this.setState({
      showTB: false
    })
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

  render () {

    const ToolbarConfig = {
    // Optionally specify the groups to display (displayed in the order listed).
    display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
    INLINE_STYLE_BUTTONS: [
      {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
      {label: 'Italic', style: 'ITALIC'},
      {label: 'Underline', style: 'UNDERLINE'}
    ],
    BLOCK_TYPE_DROPDOWN: [
      {label: 'Normal', style: 'unstyled'},
      {label: 'Heading Large', style: 'header-one'},
      {label: 'Heading Medium', style: 'header-two'},
      {label: 'Heading Small', style: 'header-three'}
    ],
    BLOCK_TYPE_BUTTONS: [
      {label: 'UL', style: 'unordered-list-item'},
      {label: 'OL', style: 'ordered-list-item'}
    ]
  };

  const hiddenToolbarConfig = {
    display: ['NONE']
  }

    var config = this.state.showTB ? ToolbarConfig : hiddenToolbarConfig
    return (
      <RichTextEditor
        toolbarConfig = {config}
        value={this.state.value}
        onFocus = {this.onFocus}
        onBlur = {this.onBlur}
        onChange={this.onChange}
        placeholder = {this.props.side} 
      />
    );
  }
}

export default NewNoriRTE