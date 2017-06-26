import React, {Component} from 'react';
import {render} from 'react-dom';

import SortableList from './list';

const style = {
  frame: {
    border: '1px solid lightgrey',
    borderRadius: '5px',
    padding: '2px',
    display: 'flex'
  }
};

class TagEditorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.data,
      showAddTag: true
    }
  }

  handleAddTag() {
    this.props.handleAddTag()
    this.setState({
        showAddTag: false
    });
  }

  handleEnter(value, id) {
    let { data } = this.props;
    if(id === data.length) {
      data.push(value);
    } else {
      data[id] = value
    }
    let newData = data.filter(d => d!=="");
    this.setState({
      showAddTag: true
    });
    this.props.handleEnter(newData);
  }

  render() {
    const { data, itemStyle, onSortEnd, handleEditTag, handleDeleteTag } = this.props;
    return (
      /* 輸入外框 */
      <div style={style.frame}>
        <SortableList
          axis={'x'}
          distance={1}
          itemStyle={itemStyle}
          items={data}
          onSortEnd={onSortEnd}
          showAddTag={this.state.showAddTag}
          handleAddTag={this.handleAddTag.bind(this)}
          handleEnter={this.handleEnter.bind(this)}
          handleEditTag={handleEditTag}
          handleDeleteTag={handleDeleteTag}
        />
      </div>
    );
  }
}

export default TagEditorComponent;
