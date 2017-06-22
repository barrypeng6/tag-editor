import React, { Component } from 'react'
import TagContainer from './tag-container';


const style = {
  border: 'solid',
  padding: '4px'
};


class TagEditor extends Component {
  constructor() {
    super();
    this.handleEnter = this.handleEnter.bind(this);
    this.state = {
      showAddTag: true
    }
  }

  handleEnter(value, id) {
    let { data } = this.props;
    if(id === data.length) {
      data.push(value);
    } else {
      data[id] = value
    }
    let newData = data.filter(d => d!=="");
    this.props.handleEnter(newData);
    this.setState({
      showAddTag: true
    });
  }

  render() {
    let { showAddTag } = this.state;
    let { data } = this.props;
    return (
      /* 輸入外框 */
      <div style={style}>
        {data.map((d, key) => {
          return (
            <TagContainer
              key={key}
              id={key}
              value={d}
              editable={d===''}
              handleEnter={this.handleEnter}
              handleChange={this.props.handleChange}
            />
          )
        })}
        {showAddTag ? <span
          style={{fontSize: '14px', color: 'lightgray'}}
          onClick={()=>{
            this.props.handleAddTag()
            this.setState({
              showAddTag: false
            });
          }}
        >add tag ...</span>
        : null
        }
      </div>
    );
  }
}

export default TagEditor;
