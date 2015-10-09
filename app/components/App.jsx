import AltContainer from 'alt/AltContainer'
import uuid from 'node-uuid'
import React from 'react'
import Lanes from './Lanes'
import LaneStore from '../stores/LaneStore'
import LaneActions from '../actions/LaneActions'

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
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
