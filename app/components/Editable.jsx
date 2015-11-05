import React from 'react'

export default class Note extends React.Component {
  constructor(props) {
    super(props)
    this.finishEdit = this.finishEdit.bind(this)
    this.checkEnter = this.checkEnter.bind(this)
    this.edit = this.edit.bind(this)
    this.renderEdit = this.renderEdit.bind(this)
    this.renderValue = this.renderValue.bind(this)

    this.state = {
      editing: false
    }
  }
  render() {
    const {value, onEdit, ...props} = this.props;
    const editing = this.state.editing;

    return (
      <div>
        {this.state.editing ? this.renderEdit() : this.renderValue()}
      </div>
    )
  }

  renderEdit() {
    return (
      <input type="text"
        autoFocus
        defaultValue={this.props.value}
        onBlur={this.finishEdit}
        onKeyPress={this.checkEnter} />
    )
  }

  renderValue() {
    return (
      <div onClick={this.edit}>
        <span className='value'>{this.props.value}</span>
        {this.props.onDelete ? this.renderDelete() : null}
      </div>
    )
  }

  renderDelete() {
    return (
      <button className='delete' onClick={this.props.onDelete}>
        &times;
      </button>
    )
  }

  edit() {
    this.setState({editing: true})
  }
  finishEdit(e) {
    this.props.onEdit(e.target.value)
    this.setState({editing: false})
  }
  checkEnter(e) {
    if (e.key === "Enter") this.finishEdit(e)
  }
}
