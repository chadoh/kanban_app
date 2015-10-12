import uuid from 'node-uuid'
import alt from '../libs/alt'
import LaneActions from '../actions/LaneActions'
import NoteActions from '../actions/NoteActions'
import NoteStore from './NoteStore'

class LaneStore {
  constructor() {
    this.bindActions(LaneActions)

    this.lanes = []
  }
  create(lane) {
    const lanes = this.lanes;
    lane.id = uuid.v4()
    lane.notes = lane.notes || [];
    this.setState({
      lanes: lanes.concat(lane)
    })
  }
  update({id, name}) {
    let lanes = this.lanes;
    let laneIndex = this.findLane(id)
    if (laneIndex < 0) return;
    lanes[laneIndex].name = name;
    this.setState({lanes: lanes})
  }
  delete(id) {
    let lanes = this.lanes;
    const laneIndex = this.findLane(id)
    if (laneIndex < 0) return;

    setTimeout(() => {
      lanes[laneIndex].notes.forEach((noteId) => {
        NoteActions.delete(noteId)
      })
    }, 500)

    this.setState({
      lanes: lanes.slice(0,laneIndex).concat(lanes.slice(laneIndex + 1))
    })
  }

  attachToLane({laneId, noteId}) {
    if (!noteId) {
      this.waitFor(NoteStore)
      noteId = NoteStore.getState().notes.slice(-1)[0].id;
    }

    const lanes = this.lanes;
    const targetId = this.findLane(laneId);

    if (targetId < 0) return;

    const lane = lanes[targetId];

    if (lane.notes.indexOf(noteId) === -1) {
      lane.notes.push(noteId);

      this.setState({lanes})
    } else {
      console.warn('Already attached note to lane', lane)
    }
  }

  detachFromLane({laneId, noteId}) {
    const lanes = this.lanes;
    const targetId = this.findLane(laneId);

    if (targetId < 0) return;

    const lane = lanes[targetId];
    const notes = lane.notes;
    const removeIndex = notes.indexOf(noteId);

    if (removeIndex !== -1) {
      lane.notes = notes.slice(0, removeIndex).concat(notes.slice(removeIndex + 1));
      this.setState({lanes});
    } else {
      console.warn('Failed to remove note from lane as it did not exist', lane);
    }
  }

  findLane(id) {
    const lanes = this.lanes;
    const laneIndex = lanes.findIndex(lane => lane.id === id)
    if (laneIndex < 0) console.warn("Failed to find lane with id", id, "in", lanes);
    return laneIndex
  }

  move({sourceId, targetId}) {
    console.log('source', sourceId, 'target', targetId)
  }
}

export default alt.createStore(LaneStore, 'LaneStore')
