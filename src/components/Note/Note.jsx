import React from 'react';
import './Note.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
      checked: this.props.checked
    };
  }
  
  handleCheck = (event) => {
    let checked = !this.state.checked;
    this.setState({checked});
    this.props.change({checked}, this.props.id);
  }

  handleDelete = (event) => {
    this.props.delete(this.props.id);
  }
  
  render() {
    let text = this.state.text;
    let checked = this.state.checked;
    return (
      <div className='note'>
        <div className={'note__text ' + (checked ? 'note__text_checked' : '')}>{text}</div>
        <span className='note__checkbox icon' onClick={this.handleCheck}>{checked ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faCheck} />}</span>
        <span className='note__trash icon' onClick={this.handleDelete}><FontAwesomeIcon icon={faTrashAlt} /></span>
      </div>
    )
  }
}

export default Note;