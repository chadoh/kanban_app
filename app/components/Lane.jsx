import AltContainer from 'alt/AltContainer';
import React from 'react';
import Notes from './Notes';
import Editable from './Editable';
import NoteStore from '../stores/NoteStore';
import NoteActions from '../actions/NoteActions';
import LaneActions from '../actions/LaneActions';

export default class Lane extends React.Component {
  constructor(props) {
    super(props);

    const id = props.lane.id;

    this.addNote = this.addNote.bind(this, id);
    this.deleteNote = this.deleteNote.bind(this, id);
    this.editName = this.editName.bind(this, id);
  }

  render() {
    const {lane, ...props} = this.props;

    return (
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

  deleteNote(laneId, noteId) {
    LaneActions.detachFromLane({laneId, noteId});
    NoteActions.delete(id);
  }
}
