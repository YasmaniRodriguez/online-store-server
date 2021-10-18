import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import { BusinessContext } from "../../contexts/BusinessContext";

export const AccountWidget = () => {
	const history = useHistory();
	const { loggedUser, setLoggedUser, getLogout } = useContext(BusinessContext);

	return loggedUser ? (
		<IconButton
			aria-label='account'
			onClick={(e) => {
				getLogout();
				setLoggedUser(false);
				history.push(`/logout`);
			}}>
			<img
				alt=''
				src='https://cdn1.iconfinder.com/data/icons/user-pictures/100/boy-256.png'
			/>
		</IconButton>
	) : (
		<IconButton
			aria-label='account'
			onClick={(e) => {
				history.push(`/login`);
			}}>
			<img
				alt=''
				src='https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-128.png'
			/>
		</IconButton>
	);
};
