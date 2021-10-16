import React from "react";
import { useHistory } from "react-router-dom";
import { IconButton } from "@material-ui/core";

export const AccountWidget = (props) => {
	const history = useHistory();

	return (
		<IconButton
			aria-label='account'
			onClick={(e) => {
				history.push(`/login`);
			}}>
			<img alt='icono cuenta de usuario' src='./images/user.png' />
		</IconButton>
	);
};
