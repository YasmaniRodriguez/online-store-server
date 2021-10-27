import React from "react";
import { useHistory } from "react-router-dom";
import {
	makeStyles,
	Typography,
	Grid,
	Paper,
	Avatar,
	TextField,
	Checkbox,
	FormControlLabel,
	Button,
	Link,
} from "@material-ui/core";
import { LockOutlined, Facebook } from "@material-ui/icons";
import { SnackBarComponent } from "../SnackBar/SnackBar";
import { SigninStyles } from "./SigninStyles";
import FacebookLogin from "react-facebook-login";

const useStyles = makeStyles((theme) => SigninStyles(theme));

export const Signin = ({
	credentials,
	changeSigninUserName,
	changeSigninUserPassword,
	userSignin,
	userSigninWithFacebook,
	catchedError,
	setCatchedError,
}) => {
	const classes = useStyles();
	const history = useHistory();

	// const responseFacebook = (response) => {
	// 	console.log(response);
	// };

	return (
		<section>
			<Grid className={classes.container}>
				<Paper elevation={10} className={classes.paper}>
					<Grid align='center'>
						<Avatar>
							<LockOutlined />
						</Avatar>
						<Typography variant='h2' component='p'>
							Sign In
						</Typography>
					</Grid>
					<TextField
						label='Username'
						placeholder='Enter username'
						fullWidth
						required
						value={credentials.username}
						onChange={changeSigninUserName}
					/>
					<TextField
						fullWidth
						label='Pasword'
						placeholder='Enter pasword'
						type='password'
						required
						value={credentials.password}
						onChange={changeSigninUserPassword}
					/>
					<FormControlLabel
						control={<Checkbox name='' color='primary' />}
						label='Remember me'
					/>
					<Button
						type='submit'
						color='primary'
						variant='contained'
						fullWidth
						onClick={(e) => {
							userSignin(e);
						}}>
						Sign In
					</Button>
					<Typography>- Or -</Typography>
					{/* <div
						class='fb-login-button'
						data-width=''
						data-size='large'
						data-button-type='continue_with'
						data-layout='default'
						data-auto-logout-link='false'
						data-use-continue-as='false'></div> */}
					{/* <Button
						color='primary'
						variant='outlined'
						startIcon={<Facebook />}
						fullWidth
						onClick={(e) => {
							userSigninWithFacebook(e);
						}}>
						Continue with Facebook
					</Button> */}
					<FacebookLogin
						appId='672538957001557'
						autoLoad={true}
						textButton='Login With Facebook'
						fields='name,email,picture'
						callback={userSigninWithFacebook}
						cssClass='my-facebook-button-class'
						icon={<Facebook />}
					/>
					<Typography>
						<Link href='#'>Forgot password ?</Link>
					</Typography>
					<Typography>
						Do you have not an account ?
						<Link
							onClick={(e) => {
								history.push(`/signup`);
							}}>
							Sign Up
						</Link>
					</Typography>
				</Paper>
			</Grid>
			<SnackBarComponent
				catchedError={catchedError}
				setCatchedError={setCatchedError}
			/>
		</section>
	);
};
