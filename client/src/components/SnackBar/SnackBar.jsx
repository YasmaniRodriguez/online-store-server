import React from "react";
import { Snackbar, makeStyles } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { SnackBarStyles } from "./SnackBarStyles";

const useStyles = makeStyles((theme) => SnackBarStyles(theme));

export const SnackBarComponent = (props) => {
	const { state, setState } = props;

	const classes = useStyles();

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setState({ ...state, open: false });
	};

	return (
		<Snackbar
			className={classes.container}
			autoHideDuration={5000}
			open={state.open}
			message={state.message}
			onClose={handleClose}>
			<Alert onClose={handleClose} severity='error'>
				{state.message}
			</Alert>
		</Snackbar>
	);
};
