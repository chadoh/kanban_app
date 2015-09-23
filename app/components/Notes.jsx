import React from 'react'
import Note from './Note'

export default class Notes extends React.Component {
  render() {
    const notes = this.props.items;
    return (
      <div>
        <ul className="notes">
          {notes.map(this.renderNote)}
        </ul>
      </div>
    )
  }
  renderNote(note) {
    return (
      <li key={`note${note.id}`} className="note">
        <Note task={note.task}/>
      </li>
    )
  }
}
