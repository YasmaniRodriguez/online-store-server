import React, { useEffect, useState } from "react";
import { makeStyles, Typography, Paper } from "@material-ui/core";
import { LogoutStyles } from "./LoginStyles";

const useStyles = makeStyles((theme) => LogoutStyles(theme));

export const Logout = () => {
	const classes = useStyles();

	return;
};
