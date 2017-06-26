import React, { Component } from 'react';
import { SortableElement } from 'react-sortable-hoc';

const style = {
  downArrow: {
    position: 'relative',
    top: '11px',
    marginLeft: '10px',
    cursor: 'pointer',
    width: 0,
    height: 0,
    borderLeft: '4px solid transparent',
    borderRight: '4px solid transparent',
    borderTop: '4px solid #000'
  }
}

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      editable: !props.value,
      showOption: false,
      isEditHover: false,
      isDelHover: false
    }
  }

  handleKeyDown(e) {
    if(e.keyCode == '13') {
      // 按下 Enter
      this.props.handleEnter(e.target.value, this.props.id);
      this.setState({
        editable: false
      });
    }
  }

  handleBlur(e) {
    this.props.handleEnter(e.target.value, this.props.id);
    this.setState({
      editable: false
    });
  }

  render() {
    const { editable, showOption, isEditHover, isDelHover } = this.state;
    const { itemStyle, handleEditTag, handleDeleteTag } = this.props;
    return (
      <div style={{position: 'relative'}}>
        <div
          style={itemStyle.tagContainer}
        >{
          editable ?
          <input
            autoFocus
            style={itemStyle.input}
            placeholder={'default'}
            value={this.state.value}
            onKeyDown={(e) => this.handleKeyDown(e)}
            onBlur={(e)=>this.handleBlur(e)}
            onChange={(e) => {
              this.setState({
                value: e.target.value
              });
            }}
          />
        :
        <div style={{padding: '5px'}}>
            <span>{this.props.value}</span>
            <span
              style={style.downArrow}
              onClick={(e)=>{
                this.setState({
                  showOption: !showOption
                });
              }}
            ></span>
        </div>
        }</div>
      {showOption ?
        <div
          style={itemStyle.option}
          onMouseLeave={(e)=>{
            this.setState({
              showOption: false
            });
          }}
        >
          <div
            style={isEditHover ? itemStyle.option.buttonHover : itemStyle.option.button}
            onMouseEnter={(e) => {
              this.setState({
                isEditHover: true
              });
            }}
            onMouseLeave={(e) => {
              this.setState({
                isEditHover: false
              });
            }}
            onClick={(e)=>handleEditTag(this.props.value)}
          >{'edit'}</div>
          <div
            style={isDelHover ? itemStyle.option.buttonHover : itemStyle.option.button}
            onMouseEnter={(e) => {
              this.setState({
                isDelHover: true
              });
            }}
            onMouseLeave={(e) => {
              this.setState({
                isDelHover: false
              });
            }}
            onClick={(e)=>{handleDeleteTag(this.props.value)}}
          >{'delete'}</div>
        </div> : null}
      </div>
    );
  }
}

export default SortableElement(Item);
