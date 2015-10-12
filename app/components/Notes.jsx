import React from 'react'
import Note from './Note'
import Editable from './Editable'

export default class Notes extends React.Component {
  constructor(props) {
    super(props)
    this.renderNote = this.renderNote.bind(this)
  }

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
      <Note className="note" onMove={this.onMoveNote}
        id={note.id} key={`note${note.id}`}>
        <Editable value={note.task}
          onEdit={this.props.onEdit.bind(null, note.id)}
          onDelete={this.props.onDelete.bind(null, note.id)}
        />
      </Note>
    )
  }
  onMoveNote({sourceId, targetId}) {
    console.log('source', sourceId, 'target', targetId)
  }
}
