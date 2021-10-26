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

const useStyles = makeStyles((theme) => SigninStyles(theme));

export const Signin = ({
	credentials,
	changeSigninUserName,
	changeSigninUserPassword,
	userSignin,
	catchedError,
	setCatchedError,
}) => {
	const classes = useStyles();
	const history = useHistory();

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
					<Button
						color='primary'
						variant='outlined'
						startIcon={<Facebook />}
						fullWidth
						onClick={(e) => {
							setCatchedError({
								open: true,
								message: "wrong user or password",
							});
						}}>
						Continue with Facebook
					</Button>
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