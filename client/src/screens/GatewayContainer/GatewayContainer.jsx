import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { GatewayContainerStyles } from "./GatewayContainerStyles";
import { Login } from "../../components/Login/Login";
import { Logout } from "../../components/Logout/Logout";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { BusinessContext } from "../../contexts/BusinessContext";

const useStyles = makeStyles((theme) => GatewayContainerStyles(theme));

export const GatewayContainer = () => {
	const classes = useStyles();
	const { gateway } = useParams();
	const history = useHistory();
	const { loggedUser, setLoggedUser } = useContext(BusinessContext);

	const [credentials, setCredentials] = useState({
		username: "",
		password: "",
	});

	const changeUserName = (e) => {
		setCredentials({
			username: e.target.value,
			password: credentials.password,
		});
	};

	const changeUserPassword = (e) => {
		setCredentials({
			username: credentials.username,
			password: e.target.value,
		});
	};

	const getLogin = (e) => {
		axios
			.post("http://localhost:8080/login", credentials)
			.then((respose) => {
				setLoggedUser(true);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const getLogout = (e) => {
		axios
			.get("http://localhost:8080/logout")
			.then((response) => {
				setLoggedUser(false);
				history.push(`/`);
			})
			.catch((error) => {
				console.log(error);
			});
	};

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
