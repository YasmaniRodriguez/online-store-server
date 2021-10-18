import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { GatewayContainerStyles } from "./GatewayContainerStyles";
import { Login } from "../../components/Login/Login";
import { Logout } from "../../components/Logout/Logout";
import { BusinessContext } from "../../contexts/BusinessContext";

const useStyles = makeStyles((theme) => GatewayContainerStyles(theme));

export const GatewayContainer = () => {
	const classes = useStyles();
	const { gateway } = useParams();
	const {
		credentials,
		changeUserName,
		changeUserPassword,
		getLogin,
		getLogout,
	} = useContext(BusinessContext);

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
								getLogin={getLogin}
							/>
						);
					case "logout":
						return <Logout getLogout={getLogout} />;
					default:
						console.log("gateway not available");
						break;
				}
			})()}
		</section>
	);
};
