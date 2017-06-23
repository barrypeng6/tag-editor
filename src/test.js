import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const style = {
  frame: {
    border: 'solid',
    padding: '4px',
    display: 'flex'
  }
};

const SortableItem = SortableElement(({value}) =>
  <div
    style={{
      width: '60px', margin: '5px', backgroundColor: 'skyblue'
    }}
  >{value}</div>
);

const SortableList = SortableContainer(({items}) => {
  return (
    <div style={{display: 'flex'}}>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </div>
  );
});

class SortableComponent extends Component {
  constructor(props) {
    super(props);
    console.log(props.data);
    this.state = {
      items: props.data,
      showAddTag: true
    }
  }

  onSortEnd({oldIndex, newIndex}) {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  }

  render() {
    return (
      /* 輸入外框 */
      <div style={style.frame}>
        <SortableList
          axis={'x'}
          items={this.state.items}
          onSortEnd={this.onSortEnd.bind(this)}
        />
        {this.state.showAddTag ?
            <div
              style={{fontSize: '14px', color: 'lightgray'}}
              onClick={()=>{
                // this.props.handleAddTag()
                // this.setState({
                //     showAddTag: false
                //   });
                }}
            >add tag ...</div>
            : null
        }
      </div>
    );
  }
}

export default SortableComponent;
