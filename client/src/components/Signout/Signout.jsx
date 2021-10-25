import React, { useEffect } from "react";
import { makeStyles, Typography, Paper } from "@material-ui/core";
import { SignoutStyles } from "./SignoutStyles";

const useStyles = makeStyles((theme) => SignoutStyles(theme));

export const Signout = ({ userSignout }) => {
	const classes = useStyles();

	useEffect(() => {
		setTimeout(() => {
			userSignout();
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
