import uuid from 'node-uuid'
import React from 'react'
import Notes from './Notes'
import NoteStore from '../stores/NoteStore'
import NoteActions from '../actions/NoteActions'
import connectToStores from 'alt/utils/connectToStores'

@connectToStores
export default class App extends React.Component {
  static getStores(props) {
    return [NoteStore]
  }
  static getPropsFromStores(props) {
    return NoteStore.getState()
  }

  render() {
    const notes = this.props.notes;

    return (
      <div className="container">
        <button className='add-note'
          onClick={this.addNote}>
          +
        </button>
        <Notes items={notes} onEdit={this.editNote} onDelete={this.deleteNote}/>
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

  findNote(id) {
    const noteIndex = this.props.notes.findIndex(note => note.id === id)

    if (noteIndex < 0) console.warn("Failed to find note", notes, id);

    return noteIndex
  }

}
