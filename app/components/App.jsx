import uuid from 'node-uuid'
import React from 'react'
import Notes from './Notes'

const notes = [
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

export default class App extends React.Component {
  render() {
    return <Notes items={notes}/>
  }
}
