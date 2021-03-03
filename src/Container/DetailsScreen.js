import React, {useState, useCallback} from 'react'
import { TextField } from "@material-ui/core"
import { useHistory } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from 'react-redux'
import {map, get, isEmpty, filter, findIndex} from 'lodash'

const useStyles = makeStyles((theme) => ({
  mainText: {
    fontSize:"24px",
    color:"chocolate",
  },
  mainContainer: {
    backgroundColor:"aqua",
    padding:"20px",
    borderRadius:"20px",
    border:"1px solid chocolate",
    margin:"50px",
    width:"700px"
  },
  btnStyle1: {
    backgroundColor:"chocolate",
    padding:"10px",
    borderRadius:"10px",
    margin:"10px",
    color:"white",
    width:"70px",
    border:"none"
  },
  btnStyle2: {
    backgroundColor:"#fff",
    padding:"10px",
    borderRadius:"10px",
    margin:"10px",
    color:"#000",
    width:"70px",
    border:"none"
  },
  errText: {
    color:"red",
    marginTop:"5px",
  }
}));


export default () => {

  const classes = useStyles();

  const dispatch = useDispatch();

  const eventObj = useSelector(state => state.createEditEventReducer.eventObj)
  const details = useSelector(state => state.createEditEventReducer.eventObj.details)
  const selectedId = useSelector(state => state.createEditEventReducer.selectedId)
  const users = filter(details, (user, index) => (user?.selectedId == selectedId))[0]

  const [firstName, setFirstName] = useState(users?.firstName || '')
  const [lastName, setLastName] = useState(users?.lastName || '')
  const [phone, setPhone] = useState(users?.phone || '')
  const [empty, setEmpty] = useState(false)
  let history = useHistory();
  const updateField = useCallback((field, value, ignoreCheck) => dispatch({type: 'UPDATE_FIELD', field, value, ignoreCheck}), [dispatch])
    
  const handleSave = () => {
    if(firstName && lastName && phone){
      let index
      index = findIndex(eventObj?.details, details => details.selectedId == selectedId) 
      if(index == -1){
        index = get(eventObj, "details").length
      }
      let userValue = {firstName,lastName,phone,status:true,selectedId}
      updateField("details[" + index + "]", userValue, true)
      dispatch({type:'SELECTED_ID', selectedId})
      setEmpty(false)
      history.push("/");
    } else {
      setEmpty(true)
    }
  }


  const handleCancel = () => {
    history.push("/");
  }


  return (
    <>
    <Grid className={classes.mainContainer} spacing={2}>
      <Typography className={classes.mainText}>User Details</Typography>
      {!isEmpty(details) ?  (
        <Grid>
          <Grid>
            <Grid item>
              <TextField
                required
                label="First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                margin="normal"
                variant="outlined"
                size="small"
                // fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                required
                label="Last Name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                margin="normal"
                variant="outlined"
                size="small"
                // fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                required
                label="Phone Number"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                margin="normal"
                variant="outlined"
                size="small"
                // fullWidth
              />
            </Grid>
            {empty && <Typography className={classes.errText}>All fields are required</Typography>}
            <Grid>
              <button className={classes.btnStyle1} onClick={handleSave}>Save</button>
              <button className={classes.btnStyle2} onClick={handleCancel}>Cancel</button>
            </Grid>
          </Grid>
        </Grid>
        ) :
        <Grid>
          <Grid item>
            <TextField
              required
              label="First Name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              margin="normal"
              variant="outlined"
              size="small"
              // fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              required
              label="Last Name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              margin="normal"
              variant="outlined"
              size="small"
              // fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              required
              label="Phone Number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              margin="normal"
              variant="outlined"
              size="small"
              // fullWidth
            />
          </Grid>
          {empty && <Typography className={classes.errText}>All fields are required</Typography>}
          <Grid>
            <button className={classes.btnStyle1} onClick={handleSave}>Save</button>
            <button className={classes.btnStyle2} onClick={handleCancel}>Cancel</button>
          </Grid>
        </Grid>
        }
        {/* {!isEmpty(details) && map(details, (user, index) => (user.selectedId != selectedId) && (
        <Grid>
          <Grid item>
            <TextField
              required
              label="First Name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              margin="normal"
              variant="outlined"
              size="small"
              // fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              required
              label="Last Name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              margin="normal"
              variant="outlined"
              size="small"
              // fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              required
              label="Phone Number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              margin="normal"
              variant="outlined"
              size="small"
              // fullWidth
            />
          </Grid>
          {empty && <Typography className={classes.errText}>All fields are required</Typography>}
          <Grid>
            <button className={classes.btnStyle1} onClick={handleSave}>Save</button>
            <button className={classes.btnStyle2} onClick={handleCancel}>Cancel</button>
          </Grid>
        </Grid>
        ))} */}
    </Grid>
  </>
  )
}