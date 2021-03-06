import React, { Component } from 'react';
import TagEditorComponent from './tag-editor-component';
import {arrayMove} from 'react-sortable-hoc';

const oData = ['apple', 'orange', 'kkk'];

const itemStyle = {
  tagContainer: {
    margin: '6px',
    padding: '0px 8px',
    backgroundColor: 'white',
    border: '1px solid skyblue',
    borderRadius: '100px',
    cursor: 'move',
    color: 'skyblue'
  },
  option: {
    position: 'absolute',
    backgroundColor: 'white',
    top: '30px',
    right: '15px',
    marginLeft: '15px',
    padding: '5px',
    border: '1px solid lightgray',
    borderRadius: '5px',
    button: {
      cursor: 'pointer'
    },
    buttonHover: {
      cursor: 'pointer',
      backgroundColor: 'lightgray'
    }
  },
  input: {
    backgroundColor: 'transparent',
    borderWidth: '0px',
    fontSize: '13px',
    width: '50px',
    padding: '5px',
    outline: 'none'
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: oData
    }
  }

  handleEnter(newData) {
    // create new tag complete
    console.log(newData);
    this.setState({
      data: newData
    });
  }

  handleAddTag() {
    let { data } = this.state;
    data.push('');
    this.setState({
      data: data
    });
  }

  onSortEnd({oldIndex, newIndex}) {
    // drop
    this.setState({
      data: arrayMove(this.state.data, oldIndex, newIndex),
    });
  }

  handleEditTag(value) {
    console.log('edit', value);
  }

  handleDeleteTag(value) {
    console.log('edit', value);
  }

  render () {
    return (
      <div>
        <TagEditorComponent
          data={this.state.data}
          itemStyle={itemStyle}
          handleEnter={this.handleEnter.bind(this)}
          handleAddTag={this.handleAddTag.bind(this)}
          onSortEnd={this.onSortEnd.bind(this)}
          handleEditTag={this.handleEditTag.bind(this)}
          handleDeleteTag={this.handleDeleteTag.bind(this)}
        />
      </div>
    );
  }
}

export default App;
