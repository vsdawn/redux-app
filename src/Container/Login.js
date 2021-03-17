import React, {useState, useCallback} from 'react'
import { TextField } from "@material-ui/core"
import { useHistory } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from 'react-redux'
import validator from 'validator'

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


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [empty, setEmpty] = useState(false)
  let history = useHistory();
  const updateField = useCallback((field, value) => dispatch({type: 'UPDATE_FIELD', field, value}), [dispatch])
    
  const handleSave = () => {
    if(validator.isEmail(email)  && password){
      let index = 0
      
      let userValue = {email, password}
      updateField("details[" + index + "]", userValue)
      setEmpty(false)
      history.push("/details");
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
        <Grid>
          <Grid>
            <Grid item>
              <TextField
                required
                label="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                margin="normal"
                variant="outlined"
                size="small"
                type="email"
                // fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                required
                label="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                margin="normal"
                variant="outlined"
                size="small"
                type="password"
                // fullWidth
              />
            </Grid>
            {empty && <Typography className={classes.errText}>Enter valid email or password</Typography>}
            <Grid>
              <button className={classes.btnStyle1} onClick={handleSave}>Login</button>
            </Grid>
          </Grid>
        </Grid>
    </Grid>
  </>
  )
}