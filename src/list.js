import React, { Component } from 'react';
import { SortableContainer } from 'react-sortable-hoc';

import SortableItem from './item';

class List extends Component {
  render () {
    const { items, itemStyle, showAddTag, handleEnter, handleAddTag, handleEditTag, handleDeleteTag } = this.props;
    return (
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {items.map((value, index) => (
          <SortableItem
            key={`item-${index}`}
            index={index}
            id={index}
            itemStyle={itemStyle}
            value={value}
            handleEnter={handleEnter}
            handleEditTag={handleEditTag}
            handleDeleteTag={handleDeleteTag}
          />
        ))}
        {showAddTag ?
            <div
              style={{margin: '10px', fontSize: '14px', color: 'lightgray'}}
              onClick={()=>{
                handleAddTag()
              }}
            >add tag ...</div>
            : null
        }
      </div>
    );
  }
}

export default SortableContainer(List);
