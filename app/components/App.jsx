import uuid from 'node-uuid'
import React from 'react'
import Notes from './Notes'
import NoteStore from '../stores/NoteStore'
import NoteActions from '../actions/NoteActions'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.storeChanged = this.storeChanged.bind(this)
    this.state = NoteStore.getState()
  }

  componentDidMount() {
    NoteStore.listen(this.storeChanged)
  }

  componentWillUnmount() {
    NoteStore.unlisten(this.storeChanged)
  }

  storeChanged(state) {
    this.setState(state)
  }

  render() {
    const notes = this.state.notes;

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
    const notes = this.state.notes;
    const noteIndex = notes.findIndex(note => note.id === id)

    if (noteIndex < 0) console.warn("Failed to find note", notes, id);

    return noteIndex
  }

}
