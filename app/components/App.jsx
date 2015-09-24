import AltContainer from 'alt/AltContainer'
import uuid from 'node-uuid'
import React from 'react'
import Notes from './Notes'
import NoteStore from '../stores/NoteStore'
import NoteActions from '../actions/NoteActions'

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <button className='add-note'
          onClick={this.addNote}>
          +
        </button>
        <AltContainer
          stores={[NoteStore]}
          inject={{
            items: () => NoteStore.getState().notes
          }}
          >
          <Notes onEdit={this.editNote} onDelete={this.deleteNote}/>
        </AltContainer>
      </div>
    )
  }

  addNote() {
    NoteActions.create({task: 'New task'})
  }

  editNote(id, task) {
    NoteActions.update({id, task})
  }

  deleteNote(id) {
    NoteActions.delete(id)
  }
}
