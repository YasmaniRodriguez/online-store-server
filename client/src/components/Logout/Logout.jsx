import React, { useEffect } from "react";
import { makeStyles, Typography, Paper } from "@material-ui/core";
import { LogoutStyles } from "./LogoutStyles";

const useStyles = makeStyles((theme) => LogoutStyles(theme));

export const Logout = ({ userLogout }) => {
	const classes = useStyles();

	useEffect(() => {
		setTimeout(() => {
			userLogout();
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
