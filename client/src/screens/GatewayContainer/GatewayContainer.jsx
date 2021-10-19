import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { GatewayContainerStyles } from "./GatewayContainerStyles";
import { Login } from "../../components/Login/Login";
import { Logout } from "../../components/Logout/Logout";
import { GatewayContext } from "../../contexts/GatewayContext";

const useStyles = makeStyles((theme) => GatewayContainerStyles(theme));

export const GatewayContainer = () => {
	const {
		credentials,
		changeUserName,
		changeUserPassword,
		userLogin,
		userLogout,
	} = useContext(GatewayContext);
	const classes = useStyles();
	const { gateway } = useParams();

	return (
		<section className={classes.container}>
			{(() => {
				switch (gateway) {
					case "login":
						return (
							<Login
								credentials={credentials}
								changeUserName={changeUserName}
								changeUserPassword={changeUserPassword}
								userLogin={userLogin}
							/>
						);
					case "logout":
						return <Logout userLogout={userLogout} />;
					default:
						console.log("gateway not available");
						break;
				}
			})()}
		</section>
	);
};
