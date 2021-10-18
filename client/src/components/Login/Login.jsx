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
import { LoginStyles } from "./LoginStyles";

const useStyles = makeStyles((theme) => LoginStyles(theme));

export const Login = ({
	credentials,
	changeUserName,
	changeUserPassword,
	getLogin,
}) => {
	const classes = useStyles();
	const history = useHistory();
	return (
		<Grid className={classes.container}>
			<Paper elevation={10} className={classes.paper}>
				<Grid align='center'>
					<Avatar className={classes.container}>
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
					onChange={changeUserName}
				/>
				<TextField
					label='Pasword'
					placeholder='Enter pasword'
					type='password'
					fullWidth
					required
					value={credentials.password}
					onChange={changeUserPassword}
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
						getLogin();
						history.push(`/`);
					}}>
					Sign In
				</Button>
				<Typography>
					<Link href='#'>Forgot password ?</Link>
				</Typography>
				<Typography>
					Do you have not an account ?<Link href='#'>Sign Up</Link>
				</Typography>
			</Paper>
		</Grid>
	);
};
