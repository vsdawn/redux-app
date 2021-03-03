import React from 'react'
import { Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((them) => ({
	Button: {
		padding: "5px 30px",
		borderRadius: "25px",
	},
}));

export default (props) => {
	const { varient, color, label, onClick } = props
	const classes = useStyles();
	return (
		<Button className={classes.Button} onClick={onClick} variant={varient} color={color}>{label}</Button>
	);
}


