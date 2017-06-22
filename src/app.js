import React, { Component } from 'react';
import TagEditor from './tag-editor';

const oData = ['apple', 'orange', 'kkk'];

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.setState({
      data: oData
    });
  }

  handleEnter(newData) {
    this.setState({
      data: newData
    });
  }

  handleChange(dragId, dropId) {
    let { data } = this.state;
    console.log(Number(dragId), '=>', dropId);
    if (dropId >= data.length) {
        var k = dropId - data.length;
        while ((k--) + 1) {
            data.push(undefined);
        }
    }
    data.splice(dropId, 0, data.splice(dragId, 1)[0]);
    console.log(data);
    this.setState({
      data: data
    });
  }

  handleAddTag() {
    let { data } = this.state;
    data.push('');
    this.setState({
      data: data
    });
  }

  render () {
    return (
      <div>
        <TagEditor
          data={this.state.data}
          handleEnter={this.handleEnter.bind(this)}
          handleChange={this.handleChange.bind(this)}
          handleAddTag={this.handleAddTag.bind(this)}
        />
      </div>
    );
  }
}

export default App;
