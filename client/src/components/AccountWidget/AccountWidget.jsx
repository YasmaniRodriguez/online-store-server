import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import { GatewayContext } from "../../contexts/GatewayContext";

export const AccountWidget = () => {
	const history = useHistory();
	const { loggedUser } = useContext(GatewayContext);
	const { logged, photo, name } = loggedUser;
	return logged ? (
		<IconButton
			aria-label='account'
			onClick={(e) => {
				history.push(`/signout`);
			}}>
			<img alt={name} src={photo} />
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
