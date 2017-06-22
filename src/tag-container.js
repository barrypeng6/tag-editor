import React, { Component } from 'react';

let style = {
  tagOriginal: {
    backgroundColor: 'skyblue',
    padding: '2px',
    width: '50px',
  },
  dropAreaOriginal: {
    color: 'white'
  },
  tagHover: {
    backgroundColor: 'skyblue',
    opacity: '0.4',
    padding: '2px',
    width: '50px',
    cursor: 'move'
  },
  tagIsDraging: {
    backgroundColor: 'skyblue',
    opacity: '0.4',
    padding: '2px',
    width: '50px',
    marginRight: '4px',
  },
  dropAreaEntered: {
    backgroundColor: 'red',
    border: '2px dashed #000',
    paddingRight: '60px'
  },
  input: {
    backgroundColor: 'transparent',
    borderWidth: '0px',
    fontSize: '13px',
    width: '50px'
  }
}


class TagContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      value: '',
      editable: false,
      tagState: style.tagOriginal,
      dropAreaState: style.dropAreaOriginal
    }
  }

  componentDidMount() {
    this.setState({
      value: this.props.value,
      editable: this.props.editable
    });
  }

  handleClick() {
    this.setState({
      value: this.props.value,
      editable: true
    });
  }

  handleKeyDown(e) {
    if(e.keyCode == '13') {
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

  handleDragStart(e) {
    console.log('drag');
    this.setState({
      tagState: style.tagIsDraging
    });
    e.dataTransfer.setData('text', this.props.id);
  }

  handleDragEnter(e) {
    console.log('drag enter');
    this.setState({
      dropAreaState: style.dropAreaEntered
    });
  }

  handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
  }

  handleDragLeave(e) {
    console.log('drag leave');
    this.setState({
      dropAreaState: style.dropAreaOriginal
    });
  }

  handleDrop(e) {
    console.log('drop', this.state.value);
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    this.setState({
      dropAreaState: style.dropAreaOriginal
    });
    this.props.handleChange(e.dataTransfer.getData('text'), this.props.id)
    return false;
  }

  handleDragEnd(e) {
    console.log('END', this.state.value);
    this.setState({
      tagState: style.tagOriginal
    });
  }

  handleMouseEnter(e) {
    this.setState({
      tagState: style.tagHover
    });
  }

  handleMouseLeave(e) {
    this.setState({
      tagState: style.tagOriginal
    });
  }

  render () {
    return (
      <span>
        <span
          style={this.state.dropAreaState}
          onDragEnter={(e) => this.handleDragEnter(e)}
          onDragOver={(e) => this.handleDragOver(e)}
          onDragLeave={(e) => this.handleDragLeave(e)}
          onDrop={(e) => this.handleDrop(e)}>
          _
        </span>
        <span
          style={this.state.tagState}
          draggable={true}
          onDragStart={(e)=> this.handleDragStart(e)}
          onDragEnd={(e) => this.handleDragEnd(e)}
          onMouseEnter={(e) => this.handleMouseEnter(e)}
          onMouseLeave={(e) => this.handleMouseLeave(e)}
          onClick={this.handleClick.bind(this)}>
          {this.state.editable
            ? <input
                autoFocus
                style={style.input}
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
            : this.props.value
          }
          <button>x</button>
        </span>
      </span>
    );
  }
}

export default TagContainer;
