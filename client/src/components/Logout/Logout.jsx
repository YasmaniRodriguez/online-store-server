import React, { useEffect, useState } from "react";
import { makeStyles, Typography, Paper } from "@material-ui/core";
import { LogoutStyles } from "./LogoutStyles";

const useStyles = makeStyles((theme) => LogoutStyles(theme));

export const Logout = (props) => {
	const classes = useStyles();

	return (
		<Paper elevation={10} className={classes.container}>
			<Typography variant='h2' component='p'>
				Hasta luego usuario
			</Typography>
		</Paper>
	);
};
