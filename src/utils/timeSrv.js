import moment from "moment-timezone"
import {toNumber, isNaN} from 'lodash'

export function getTimeZone(time) {
  if (!time || time === "all") time = new Date().getTime()
  return moment(time)
    .tz("America/Los_Angeles")
    .format("z")
}

export function getZoneTxt (time) {
  if (getTimeZone(time) === "PST") {
    return "All times in Pacific Standard Time (PST)"
  } else {
    return "All times in Pacific Daylight Time (PDT)"
  }
}

function getTimeDiff(time) {
  if (!time || time === "all") time = new Date().getTime()

  if (getTimeZone(time) === "PST") {
    return ((480 - new Date(time).getTimezoneOffset()) * 60 * 1000)
  } else {
    return ((420 - new Date(time).getTimezoneOffset()) * 60 * 1000)
  }
}

export function getLocalFromPST(givenTime) {
  givenTime = isNaN(toNumber(givenTime)) ? givenTime : toNumber(givenTime)
  return new Date(givenTime).getTime() - getTimeDiff(givenTime)
}

export function getPSTFromLocal(time) {
  time = isNaN(toNumber(time)) ? time : toNumber(time)
  return new Date(time).getTime() + getTimeDiff(time)
}