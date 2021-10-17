import React from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { GatewayContainerStyles } from "./GatewayContainerStyles";
import { Login } from "../../components/Login/Login";
import { Logout } from "../../components/Logout/Logout";

const useStyles = makeStyles((theme) => GatewayContainerStyles(theme));

export const GatewayContainer = () => {
	const classes = useStyles();
	const { gateway } = useParams();
	return (
		<section className={classes.container}>
			{(() => {
				switch (gateway) {
					case "login":
						return <Login />;
					case "logout":
						return <Logout />;
					default:
						console.log("gateway not available");
						//404 Page Not Foud
						break;
				}
			})()}
		</section>
	);
};
