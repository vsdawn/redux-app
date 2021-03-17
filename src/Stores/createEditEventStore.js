import { set, map, isArray } from 'lodash'
import initEventData from './eventInitData'


//initial State
const INITIAL_STATE = {
  eventObj: initEventData,
};

//Types
export const UDPATE_FIELD = "UDPATE_FIELD"

//Actions
export const updateField = (field, value) => ({ type: UDPATE_FIELD, field, value })


//Reducers
export const createEditEventReducer = (state = INITIAL_STATE, action) => {
  // console.log("Came here..", action.type, action.eventObj)
  switch (action.type) {
    case "UPDATE_FIELD":
      if(isArray(action.field)) {
        let eObj = state.eventObj
        map(action.field, f => (eObj = {...set(eObj, f.field, f.value)}) )
        state = {...state, eventObj: {...eObj}}
        return {...state, eventObj: {...eObj}}
      } else {
        return { ...state, eventObj: {...set(state.eventObj, action.field, action.value)} }
      }

    default:
      return { ...state };
  }
};
