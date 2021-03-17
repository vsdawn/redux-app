import React, {useState, useCallback} from 'react'
import { TextField } from "@material-ui/core"
import { useHistory } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

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
  categoryBox: {
    backgroundColor:"white",
    padding:"10px",
    marginTop:"10px",
    border:"2px solid gray",
    borderRadius:"10px",
    cursor:"pointer",
  },
  category: {
    fontSize:"24px",
    color:"chocolate",
    textAlign:"left",
  },
}));



export default () => {

  const classes = useStyles();

  const dispatch = useDispatch();
  const details = useSelector(state => state.createEditEventReducer.eventObj.details)

  const[items, setItems] = useState([])
  const[cat, setCat] = useState("")

  
  let history = useHistory();

  const handleCategory = (category) => {
    var url
    if(category == "Capsules"){
      url = "https://api.spacexdata.com/v3/capsules"
    } else if(category == "Cores"){
      url = "https://api.spacexdata.com/v3/cores"
    } else if(category == "Dragons"){
      url = "https://api.spacexdata.com/v3/dragons"
    } else if(category == "History"){
      url = "https://api.spacexdata.com/v3/history"
    } else if(category == "Launches"){
      url = "https://api.spacexdata.com/v3/launches"
    }

    axios.get(url)
    .then(function (response) {
      // handle success
      console.log("userList Value is*******",response);
      setItems(response?.data?.slice(0, 5))
      setCat(category)
      console.log("items value*******", items)
    })
    .catch(function (error) {
      console.log(error);
    })

  }
  
  return (
    <>
    <Grid className={classes.mainContainer} spacing={2}>
      <Typography className={classes.mainText}>{"User Details" + " " + ("email: " + details[0]?.email)}</Typography>
      <Typography className={classes.mainText}>I am showing maximum 5 data from every array(response data).</Typography>
        <Grid>
          <Grid onClick={() => handleCategory("Capsules")} className={classes.categoryBox}>
            <Typography className={classes.category}>Capsules</Typography>
            {cat == "Capsules" && items?.map(item => {
            return <Grid container>
              <Grid item xs={4}>
                <Typography>{item.capsule_serial}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>{item.capsule_id}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>{item.details}</Typography>
              </Grid>
            </Grid>})}
          </Grid>
          <Grid onClick={() => handleCategory("Cores")} className={classes.categoryBox}>
            <Typography className={classes.category}>Cores</Typography>
            {cat == "Cores" && items?.map(item => {
            return <Grid container>
              <Grid item xs={4}>
                <Typography>{item.core_serial}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>{item.status}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>{item.details}</Typography>
              </Grid>
            </Grid>})}
          </Grid>
          <Grid onClick={() => handleCategory("Dragons")} className={classes.categoryBox}>
            <Typography className={classes.category}>Dragons</Typography>
            {cat == "Dragons" && items?.map(item => {
            return <Grid container>
              <Grid item xs={4}>
                <Typography>{item.name}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>{item.id}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>{item.description}</Typography>
              </Grid>
            </Grid>})}
          </Grid>
          <Grid onClick={() => handleCategory("History")} className={classes.categoryBox}>
            <Typography className={classes.category}>History</Typography>
            {cat == "History" && items?.map(item => {
            return <Grid container>
              <Grid item xs={4}>
                <Typography>{item.title}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>{item.flight_number}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>{item.details}</Typography>
              </Grid>
            </Grid>})}
          </Grid>
          <Grid onClick={() => handleCategory("Launches")} className={classes.categoryBox}>
            <Typography className={classes.category}>Launches</Typography>
            {cat == "Launches" && items?.map(item => {
            return <Grid container>
              <Grid item xs={4}>
                <Typography>{item.mission_name}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>{item.flight_number}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>{item.details}</Typography>
              </Grid>
            </Grid>})}
          </Grid>
        </Grid>
    </Grid>
  </>
  )
}