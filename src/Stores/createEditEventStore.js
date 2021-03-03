import { set, map, isArray } from 'lodash'
import initEventData from './eventInitData'


//initial State
const INITIAL_STATE = {
  eventObj: initEventData,
  selectedId:""
};

//Types
export const UDPATE_FIELD = "UDPATE_FIELD"
export const DETAILS_STATUS = "DETAILS_STATUS"
export const SELECTED_ID = "SELECTED_ID"

//Actions
export const updateField = (field, value, ignoreCheck) => ({ type: UDPATE_FIELD, field, value, ignoreCheck })
export const detailsStatus = (details) => ({ type: DETAILS_STATUS, details })
export const selecteId = (id) => ({ type: SELECTED_ID, id })


//Reducers
export const createEditEventReducer = (state = INITIAL_STATE, action) => {
  // console.log("Came here..", action.type, action.eventObj)
  switch (action.type) {
    case "UPDATE_FIELD":
      if(isArray(action.field)) {
        let eObj = state.eventObj
        map(action.field, f => (eObj = {...set(eObj, f.field, f.value)}) )
        return {...state, eventObj: {...eObj}}
      } else {
        return { ...state, eventObj: {...set(state.eventObj, action.field, action.value)} }
      }

    case "SELECTED_ID":
      state = { ...state, selectedId: action.id }
      return state

    default:
      return { ...state };
  }
};
