import AltContainer from 'alt/AltContainer'
import uuid from 'node-uuid'
import React from 'react'
import Lanes from './Lanes'
import LaneStore from '../stores/LaneStore'
import LaneActions from '../actions/LaneActions'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

@DragDropContext(HTML5Backend)
export default class App extends React.Component {
  render() {
    return (
      <div>
        <button className='add-lane'
          onClick={this.addItem}>
          +
        </button>
        <AltContainer
          stores={[LaneStore]}
          inject={{
            items: () => LaneStore.getState().lanes
          }}
          >
          <Lanes/>
        </AltContainer>
      </div>
    )
  }

  addItem() {
    LaneActions.create({name: 'New lane'})
  }
}
