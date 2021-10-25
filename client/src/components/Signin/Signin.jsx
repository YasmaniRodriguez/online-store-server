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
import { LockOutlined } from "@material-ui/icons";
import { SigninStyles } from "./SigninStyles";

const useStyles = makeStyles((theme) => SigninStyles(theme));

export const Signin = ({
	credentials,
	changeSigninUserName,
	changeSigninUserPassword,
	userSignin,
}) => {
	const classes = useStyles();
	const history = useHistory();
	return (
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
						history.push(`/`);
					}}>
					Sign In
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
	);
};
