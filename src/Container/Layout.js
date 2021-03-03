import React, {useState, useEffect, useCallback} from 'react';
import "../App/App.css";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box ,Typography} from "@material-ui/core";
import TimeFnsUtils from "@date-io/date-fns"
import AddCircleIcon from "@material-ui/icons/AddCircle"
import {map, get, isEmpty, filter} from 'lodash'
import DeleteIcon from "@material-ui/icons/DeleteOutline"
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from "@material-ui/pickers"
import moment from "moment"
import { useSelector, useDispatch } from 'react-redux'


const useStyles = makeStyles((theme) => ({
  body: {
    padding: "50px 80px 0 80px",
    [theme.breakpoints.down("lg")]: {
      paddingLeft: 60,
      paddingRight: 60,
    },
    [theme.breakpoints.down("md")]: {
      paddingLeft: 40,
      paddingRight: 40,
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 10,
      paddingRight: 10,
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  mainContainer: {
    backgroundColor:"aqua",
    padding:"20px",
    borderRadius:"20px",
    border:"1px solid chocolate",
  },
  textCenter: {
    textAlign: "center",
    margin: "30px auto 20px",
  },
  startTimeStyle: {
    margin:'10px',
  },
  endTimeStyle: {
    margin:'10px',
  },
  btnStyle: {
    backgroundColor:"#000000",
    padding:"10px",
    borderRadius:"10px",
    marginTop:"10px",
    color:"white",
    border:"none"
  },
  btnStatusStyle: {
    backgroundColor:"red",
    padding:"10px",
    borderRadius:"10px",
    marginTop:"10px",
    color:"white",
    border:"none"
  },
  mainText: {
    fontSize:"24px",
    color:"chocolate",
  },
  deleteStyle: {
    marginTop:"15px",
    marginRight:"10px"
  }
}));

export default (props) => {
  let history = useHistory();

  const classes = useStyles();
  
  const dispatch = useDispatch()

  const eventObj = useSelector(state => state.createEditEventReducer.eventObj)
  const details = useSelector(state => state.createEditEventReducer.eventObj.details)
  const selectedId = useSelector(state => state.createEditEventReducer.selectedId)


  const makeId = () => {
    let ID = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for ( var i = 0; i < 12; i++ ) {
      ID += characters.charAt(Math.floor(Math.random() * 36));
    }
    return ID;
  }

  const [startTime, setStartTime] = useState(moment(new Date()).hours(9).startOf('hour').format());
  const [endTime, setEndTime] = useState(moment(new Date()).hours(17).startOf('hour').format());
  const [id, setId] = useState(makeId())

  const updateField = useCallback((field, value, ignoreCheck) => dispatch({type: 'UPDATE_FIELD', field, value, ignoreCheck}), [dispatch])

  //Submit button for redirecting on new page
  const onSubmitTime = (field,value,index) => {
    if(value) {
      dispatch({type:'SELECTED_ID', id:value})
      updateField("eventTimings[" + index + "][" + field + "]", true)
    } else {
      dispatch({type:'SELECTED_ID', id})
      updateField("eventTimings[" + index + "][" + field + "]", true)
    }
    
    history.push("/details");
  }


  // Add new date function
  const addNewDate = useCallback((value, ignoreCheck)  => {
    const index = get(eventObj, "eventTimings").length
    var validateIdx = eventObj?.eventTimings?.length
    let timeTemplet
    if (value === "newTime") {
    timeTemplet = {
      startTime: moment(new Date()).hours(9).startOf('hour').format(),
      endTime: moment(new Date()).hours(17).startOf('hour').format(),
      id
    }
    } else {
      timeTemplet = {
        startTime: moment((validateIdx && eventObj?.eventTimings[index - 1].startTime) || new Date()).hours(9).startOf('hour').add('day', 1).format(),
        endTime: moment((validateIdx && eventObj?.eventTimings[index - 1].startTime) || new Date()).hours(17).startOf('hour').add('day', 1).format(),
        id
      }
    }
    // setEventTiming([et, ...eventTiming])
    updateField("eventTimings[" + index + "]", timeTemplet, true)
  }, [eventObj, updateField])

  // If eventTiming is empty then call this fuction
  useEffect(() => {
    if (!eventObj.eventTimings || !eventObj.eventTimings.length) {
      console.log("value******")
      addNewDate("newTime", true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventObj.eventTimings])

  const handleTimeChange = (field, newTime, index) => {
    updateField("eventTimings[" + index + "][" + field + "]", newTime)
  }  



  // Remove time slot if greater than one slot
  const removeTime = index => {
    if (!isEmpty(eventObj.eventTimings[index])) {
      if (eventObj.eventTimings[index].id) {
        updateField("eventTimings" + "[" + index + "]", {...eventObj.eventTimings[index], deleted:true} )
      } else {
        updateField("eventTimings", [
          ...eventObj.eventTimings.slice(0,index), 
          ...eventObj.eventTimings.slice(index+1)
        ])
      }
    }
  }

  //we can use for time interval in timepicker
  const timeConstraints = { minutes: { step: 15 } }
  return (
    <main>
      <Box className={classes.body}>
        <Box mt={2}>
          <Grid className={classes.mainContainer} container spacing={2}>
            <Typography className={classes.mainText}>Choose Exact Time Zone</Typography>
            {map(eventObj.eventTimings, (date, index) => 
              !date.deleted && (
              <Grid container className={classes.paddTB5} alignItems="center">
                <Grid item className={classes.startTimeStyle}>
                  <MuiPickersUtilsProvider utils={TimeFnsUtils}>
                    <KeyboardTimePicker
                      margin="normal"
                      id="time-picker"
                      label="Start Time"
                      value={date.startTime || startTime || new Date()}
                      onChange={event => handleTimeChange("startTime", event, index)}
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item className={classes.endTimeStyle}>
                  <MuiPickersUtilsProvider utils={TimeFnsUtils}>
                    <KeyboardTimePicker
                      margin="normal"
                      id="time-picker"
                      label="End Time"
                      value={date.endTime || endTime || new Date()}
                      onChange={event => handleTimeChange("endTime", event, index)}
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                      minutesStep="15"
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item>
                  {filter(eventObj?.eventTimings, event => event.deleted != true)?.length > 1 ? (
                    <DeleteIcon color="primary" className={[classes.font18, classes.deleteStyle, "pointer"].join(' ')} onClick={() => removeTime(index)} />
                  ) : null}
                </Grid>
                <Grid item>
                  <button className={date.status ? classes.btnStatusStyle : classes.btnStyle} onClick={() => onSubmitTime("status", date.id, index)}>TimeZone</button>
                </Grid>
              </Grid>
            ))}
            <Grid container alignItems="center" className={classes.addEvent} onClick={() => addNewDate()}>
              <AddCircleIcon color="primary"/> <Typography component="span" color="primary" className={classes.padd5}> Add a time </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </main>
  );
};