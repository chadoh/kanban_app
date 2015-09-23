import uuid from 'node-uuid'
import React from 'react'
import Notes from './Notes'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [
        {
          id: uuid.v4(),
          task: 'Learn Webpack'
        },
        {
          id: uuid.v4(),
          task: 'Learn React'
        },
        {
          id: uuid.v4(),
          task: 'Do Laundry'
        }
      ]
    }

    this.editNote = this.editNote.bind(this)
    this.addNote = this.addNote.bind(this)
  }

  render() {
    const notes = this.state.notes;

    return (
      <div>
        <button className='add-note'
          onClick={this.addNote}>
          +
        </button>
        <Notes items={notes} onEdit={this.editNote}/>
      </div>
    )
  }

  editNote(noteId, task) {
    console.log(noteId, task)
  }

  addNote() {
    this.setState({
      notes: this.state.notes.concat([{
        id: uuid.v4(),
        task: 'New task'
      }])
    })
  }
}
