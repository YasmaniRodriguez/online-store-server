import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import { GatewayContext } from "../../contexts/GatewayContext";

export const AccountWidget = () => {
	const history = useHistory();
	const { loggedUser } = useContext(GatewayContext);

	return loggedUser ? (
		<IconButton
			aria-label='account'
			onClick={(e) => {
				history.push(`/signout`);
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
				history.push(`/signin`);
			}}>
			<img
				alt=''
				src='https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-128.png'
			/>
		</IconButton>
	);
};
