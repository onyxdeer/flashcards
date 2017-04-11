import React, {Component, PropTypes} from 'react';
import RichTextEditor from 'react-rte';
 import {convertFromRaw, EditorState, convertToRaw} from 'draft-js'

class NewNoriRTE extends Component {
constructor(props){
  super(props)    
  this.state = {
    value: RichTextEditor.createEmptyValue(),
    rawValue: props.value,
    showTB : true,
  }
  this.updateValue = this.updateValue.bind(this)
  this.onFocus = this.onFocus.bind(this)
  this.onBlur = this.onBlur.bind(this)
  this.onChange = this.onChange.bind(this)
  this.handleNoriChange = this.props.handleNoriChange
}

  // componentWillReceiveProps (newProps) {
  //   console.log('componeWillReceives fires from rte')

  //   if(newProps.nori.text != this.state.rawValue){
  //     console.log(newProps.nori.text)
  //     var rawJs = newProps.nori.text
  //     var newValue = this.updateValue(rawJs)
  //     this.setState({value: newValue})
  //   }
  // }

  updateValue (rawJs) {
    console.log(rawJs)
    if(rawJs){
      console.log("What is happening?", JSON.parse(rawJs))
      var content = convertFromRaw(JSON.parse(rawJs))
      console.log(content)
      var newValue = RichTextEditor.createEmptyValue()
      console.log(newValue)
      newValue._editorState = EditorState.createWithContent(content)
      return newValue
    }
    return RichTextEditor.createEmptyValue()
  }r

  onFocus (){
    this.setState({
      showTB : true
    })
  }

  onBlur () {
    this.setState({
      showTB: true
    })
  }


  onChange (value) {
    var rawValue = JSON.stringify(convertToRaw(value._editorState.getCurrentContent()))
    this.setState({value,  rawValue: rawValue}, () => {
    this.props.handleNoriChange(rawValue, this.props.side, this.props.number)}
    )
  }

  // componentDidMount() {
  //   console.log("Line 66", this.props)
  //     var newValue = this.updateValue(this.props.nori.text)
  //     this.setState({value: newValue})
  // }

  render () {
    console.log(this.props)
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