import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, Typography, Paper } from "@material-ui/core";
import { LogoutStyles } from "./LogoutStyles";

const useStyles = makeStyles((theme) => LogoutStyles(theme));

export const Logout = ({ getLogout }) => {
	const classes = useStyles();
	const history = useHistory();

	useEffect(() => {
		getLogout();
		setTimeout(() => {
			history.push(`/`);
		}, 3000);
	}, []);

	return (
		<Paper elevation={10} className={classes.container}>
			<Typography variant='h2' component='p'>
				Hasta luego
			</Typography>
		</Paper>
	);
};
