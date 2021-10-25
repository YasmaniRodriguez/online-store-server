import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { GatewayContainerStyles } from "./GatewayContainerStyles";
import { Signin } from "../../components/Signin/Signin";
import { Signup } from "../../components/Signup/Signup";
import { Signout } from "../../components/Signout/Signout";
import { GatewayContext } from "../../contexts/GatewayContext";

const useStyles = makeStyles((theme) => GatewayContainerStyles(theme));

export const GatewayContainer = () => {
	const {
		registration,
		changeSignupUserName,
		changeSignupUserEmail,
		changeSignupUserGender,
		changeSignupUserPhone,
		changeSignupUserPassword,
		changeSignupUserConfirm,
		changeSignupUserTyC,
		credentials,
		changeSigninUserName,
		changeSigninUserPassword,
		userSignin,
		userSignup,
		userSignout,
	} = useContext(GatewayContext);
	const classes = useStyles();
	const { gateway } = useParams();

	return (
		<section className={classes.container}>
			{(() => {
				switch (gateway) {
					case "signin":
						return (
							<Signin
								credentials={credentials}
								changeSigninUserName={changeSigninUserName}
								changeSigninUserPassword={changeSigninUserPassword}
								userSignin={userSignin}
							/>
						);
					case "signup":
						return (
							<Signup
								registration={registration}
								changeSignupUserName={changeSignupUserName}
								changeSignupUserEmail={changeSignupUserEmail}
								changeSignupUserGender={changeSignupUserGender}
								changeSignupUserPhone={changeSignupUserPhone}
								changeSignupUserPassword={changeSignupUserPassword}
								changeSignupUserConfirm={changeSignupUserConfirm}
								changeSignupUserTyC={changeSignupUserTyC}
								userSignup={userSignup}
							/>
						);
					case "signout":
						return <Signout userSignout={userSignout} />;
					default:
						console.log("gateway not available");
						break;
				}
			})()}
		</section>
	);
};
