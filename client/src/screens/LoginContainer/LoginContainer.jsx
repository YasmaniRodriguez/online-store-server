import React from "react";
import { makeStyles } from "@material-ui/core";
import { LoginContainerStyles } from "./LoginContainerStyles";
import { Login } from "../../components/Login/Login";

const useStyles = makeStyles((theme) => LoginContainerStyles(theme));

export const LoginContainer = () => {
	const classes = useStyles();

	return (
		<section className={classes.container}>
			<Login />
		</section>
	);
};
