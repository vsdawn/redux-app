import React, {useState, useEffect, useCallback} from 'react';
import "../App/App.css";
// import AppBar from "../Components/AppBar";
import { BrowserRouter, Link, Switch, Route, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
// import Assessment from "../Container/Assessment";
import { Grid, Box ,Typography} from "@material-ui/core";
// import RightContent from "../Components/RightContent";
import Button from "../Components/Button";
// import AccountsCard from './Accordions';
import TimeFnsUtils from "@date-io/date-fns"
// import MomentUtils from "@date-io/moment";
import AddCircleIcon from "@material-ui/icons/AddCircle"
import {map, get, isEmpty} from 'lodash'
import DeleteIcon from "@material-ui/icons/DeleteOutline"
import { getPSTFromLocal, getLocalFromPST } from '../utils/timeSrv'
import {
  MuiPickersUtilsProvider,
  TimePicker,
  KeyboardTimePicker,
  DatePicker
} from "@material-ui/pickers"
import moment from "moment"
import Layout from './Layout';
import DetailsScreen from './DetailsScreen';

const title = "Find Top Customers";
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
  textCenter: {
    textAlign: "center",
    margin: "30px auto 20px",
  },
}));
let eventObj = {
  eventTimings: [{
    startTime:"",
    endTime:""
  }]
}
export default (props) => {
  // let history = useHistory();
  console.log("evn value is ***", eventObj)
  const classes = useStyles();
  const [assessmentState, setAssessmentState] = useState(true)
  const [label, setLabel] = useState('Hide Filter')
  const handleCLick = () => {
    setAssessmentState(!assessmentState);
    assessmentState ?  setLabel('Show Filter') : setLabel('Hide Filter'); 
    // let path=`home`;
    // history.push('/home');    
  }
  const [eventObject, setEventObject] = React.useState(eventObj || {});
  const [eventTiming, setEventTiming] = React.useState(eventObject.eventTimings);
  const [startTime, setStartTime] = React.useState(new Date());
  const [endTime, setEndTime] = React.useState(new Date());
  const handleStartTimeChange = (field, newTime, index) => {
    setStartTime(newTime);
    // let eventTimings = eventObj.eventTimings
    eventTiming[index][field] = newTime
    console.log("eventTimings value is", eventTiming)
    eventObj= {...eventObj, eventTiming}
  };
  const handleEndTimeChange = (field, newTime, index) => {
    setEndTime(newTime);
    // let eventTimings = eventObj.eventTimings
    eventTiming[index][field] = newTime
    console.log("eventTimings value is", eventTiming)
    eventObj= {...eventObj, eventTiming}
  };
  const addNewDate = () => {
    const index = eventObj?.eventTimings?.length
    // var validateIdx = eventObj.eventTimings.length
    console.log("add date function")
    let et = {
      startTime: moment(new Date()).format(),
      endTime: moment(new Date()).format(),
    }
    setEventTiming([et, ...eventTiming])
    console.log("eventObj********########",eventTiming)
  }
  // useEffect(() => {
  //   if (!eventObj.eventTimings || !eventObj.eventTimings.length) {
  //     addNewDate("newEvent", true)
  //   }
  // }, [eventObj.eventTimings])
  const handleTimeChange = (field, newTime, index) => {
    console.log("newtime value is", newTime)
    let eventTimings = eventObj.eventTimings
    eventTimings[index][field] = newTime
    console.log("eventTimings value is", eventTimings)
    eventObj= {...eventObj, eventTimings}
    console.log("eventObj value is", eventObj)
    // updateField("eventTimings[" + index + "][" + field + "]", getPSTFromLocal(newTime))
  }  

  const removeDate = index => {
    if (!isEmpty(eventTiming[index])) {
      console.log("an item is deleted successfully")
      setEventTiming([{deleted:true}, ...eventTiming])
      eventTiming.splice(index, 1);
      // eventTiming.slice(0,index);
      //     eventTiming.slice(index+1)
    }
  }
  const timeConstraints = { minutes: { step: 15 } }
  return (
    <BrowserRouter>
      <main>
        {/* <BodyLayout/> */}
            <Switch>
              <Route exact path="/" component={Layout}/>
              <Route exact path="/details" component={DetailsScreen}/>
              {/* <Route exact path="/other" component={Other}/> */}
            </Switch>
      </main>
    </BrowserRouter>
  );
};