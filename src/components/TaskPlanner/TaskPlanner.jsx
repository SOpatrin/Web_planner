import React from 'react';
import Note from '../Note/Note.jsx';
import './TaskPlanner.css';

class TaskPlanner extends React.Component {
  constructor(props) {
    super(props);
    let data = this.getCookie('data');
    data = data === undefined ? {} : JSON.parse(data);
    data.defaultItem = {id: 0, value: '', checked: false};
    this.state = {
      data,
      value: ''
    };
  }
  
  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.handleButton();
    }
  }
  
  handleButton = () => {
    let {data, value} = this.state;
    if (value) {
      let maxId = 0;
      for (let key in data) {
        if (data[key].id >= maxId) {
          maxId = data[key].id;
        }
      }
      maxId++;
      data[maxId] = {id: maxId, text: value};
      this.setState({data: data});
    }
    this.setState({value: ''});
  }

  deleteNote = (id) => {
    let data = this.state.data;
    if (data[id]) {
      delete data[id];
      this.setState({data});
    }
  }

  changeNote = (item, id) => {
    let data = this.state.data;
    if (data[id]) {
      for (let key in data.defaultItem) {
        if (item.hasOwnProperty(key)) {
          data[id][key] = item[key];
        }
      }
      this.setState({data});
    }
  }

  render() {
    let {data, value} = this.state;
    let list = [];
    for (let key in data) {
      if (key !== 'defaultItem') {
        list.push(<Note key={data[key].id} id={data[key].id} text={data[key].text} checked={data[key].checked || false}  delete={this.deleteNote} change={this.changeNote} />);
      }
    }
    
    return (
      <div className='task-planner'>
        <div className='task-planner-input'>
          <input className='task-planner-input__text' type='text' value={value} placeholder='Спланировать задачу' onChange={this.handleChange} onKeyDown={this.handleKeyDown} />
          <button className='task-planner-input__button' onClick={this.handleButton}>Создать</button>
        </div>
        <div className='note-list'>
          {list}
        </div>
      </div>
    )
  }

  componentDidUpdate() {
    this.setCookie('data', JSON.stringify(this.state.data), {expires: 864000000000});
  }

  setCookie(name, value, options) {
    options = options || {};
  
    var expires = options.expires;
  
    if (typeof expires == "number" && expires) {
      var d = new Date();
      d.setTime(d.getTime() + expires * 1000);
      expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
      options.expires = expires.toUTCString();
    }
  
    value = encodeURIComponent(value);
  
    var updatedCookie = name + "=" + value;
  
    for (var propName in options) {
      updatedCookie += "; " + propName;
      var propValue = options[propName];
      if (propValue !== true) {
        updatedCookie += "=" + propValue;
      }
    }
  
    document.cookie = updatedCookie;
  }
  
  getCookie(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  
  deleteCookie(name) {
    this.setCookie(name, "", {
      expires: -1
    })
  }
}

export default TaskPlanner;