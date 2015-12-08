import React from 'react'
import Note from './Note'
import Editable from './Editable'
import LaneActions from '../actions/LaneActions'

class Notes extends React.Component {
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
      <Note className="note" onMove={LaneActions.move}
        id={note.id} key={`note${note.id}`}>
        <Editable value={note.task}
          onEdit={this.props.onEdit.bind(null, note.id)}
          onDelete={this.props.onDelete.bind(null, note.id)}
        />
      </Note>
    )
  }
}

Notes.propTypes = {
  items: React.PropTypes.array,
  onEdit: React.PropTypes.func,
  onDelete: React.PropTypes.func,
}

Notes.defaultProps = {
  items: [],
  onEdit: () => {},
  onDelete: () => {},
}

export default Notes
