import AltContainer from 'alt/AltContainer';
import React from 'react';
import Notes from './Notes';
import Editable from './Editable';
import NoteStore from '../stores/NoteStore';
import NoteActions from '../actions/NoteActions';
import LaneActions from '../actions/LaneActions';
import {DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

const noteTarget = {
  hover(targetProps, monitor) {
    const sourceId = monitor.getItem().id;

    if(!targetProps.lane.notes.length) {
      LaneActions.attachToLane({
        laneId: targetProps.lane.id,
        noteId: sourceId
      })
    }
  }
}

@DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))
class Lane extends React.Component {
  constructor(props) {
    super(props);

    const id = props.lane.id;

    this.addNote = this.addNote.bind(this, id);
    this.deleteNote = this.deleteNote.bind(this);
    this.editName = this.editName.bind(this, id);
  }

  render() {
    const {connectDropTarget, lane, ...props} = this.props;

    return connectDropTarget(
      <div {...props}>
        <div className="lane-header">
          <Editable
            className="lane-name"
            value={lane.name}
            onEdit={this.editName}
          />
          <div className="lane-add-note">
            <button onClick={this.addNote}>+</button>
          </div>
        </div>
        <AltContainer
          stores={[NoteStore]}
          inject={ {
            items: () => NoteStore.get(lane.notes)
          } }
        >
          <Notes onEdit={this.editNote} onDelete={this.deleteNote}/>
        </AltContainer>
      </div>
    )
  }

  addNote(laneId) {
    NoteActions.create({task: 'New Task'})
    LaneActions.attachToLane({laneId})
  }

  editNote(id, task) {
    NoteActions.update({id, task});
  }

  editName(id, name) {
    if (name) LaneActions.update({id, name})
    else LaneActions.delete(id)
  }

  deleteNote(id) {
    LaneActions.removeNote(id);
    NoteActions.delete(id);
  }
}

Lane.propTypes = {
  lane: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string,
    notes: React.PropTypes.array,
  }).isRequired,
  connectDropTarget: React.PropTypes.func,
}

Lane.defaultProps = {
  notes: [],
}

export default Lane
