import React from "react";
import {
	makeStyles,
	Typography,
	Grid,
	Paper,
	Avatar,
	TextField,
	Radio,
	RadioGroup,
	Checkbox,
	FormControlLabel,
	FormControl,
	FormLabel,
	Button,
} from "@material-ui/core";
import { AddCircleOutlineOutlined } from "@material-ui/icons";
import { SnackBarComponent } from "../SnackBar/SnackBar";
import { SignupStyles } from "./SignupStyles";

const useStyles = makeStyles((theme) => SignupStyles(theme));

export const Signup = ({
	registration,
	changeSignupUserName,
	changeSignupUserEmail,
	changeSignupUserGender,
	changeSignupUserPhone,
	changeSignupUserPassword,
	changeSignupUserConfirm,
	changeSignupUserTyC,
	userSignup,
	catchedError,
	setCatchedError,
}) => {
	const classes = useStyles();

	return (
		<section>
			<Grid className={classes.container}>
				<Paper elevation={10} className={classes.paper}>
					<Grid align='center'>
						<Avatar>
							<AddCircleOutlineOutlined />
						</Avatar>
						<Typography variant='h2' component='p'>
							Sign Up
						</Typography>
						<Typography variant='caption' gutterBottom>
							Please fill this form to create an account !
						</Typography>
					</Grid>
					<form>
						<TextField
							fullWidth
							label='Name'
							placeholder='Enter your name'
							required
							value={registration.name}
							onChange={changeSignupUserName}
						/>
						<TextField
							fullWidth
							label='Email'
							placeholder='Enter your email'
							required
							value={registration.email}
							onChange={changeSignupUserEmail}
						/>
						<FormControl component='fieldset'>
							<FormLabel component='legend'>Gender</FormLabel>
							<RadioGroup
								aria-label='gender'
								name='gender'
								style={{ display: "initial" }}
								value={registration.gender}
								onChange={changeSignupUserGender}>
								<FormControlLabel
									value='female'
									control={<Radio />}
									label='Female'
								/>
								<FormControlLabel
									value='male'
									control={<Radio />}
									label='Male'
								/>
								<FormControlLabel
									value='other'
									control={<Radio />}
									label='Other'
								/>
							</RadioGroup>
						</FormControl>
						<TextField
							fullWidth
							label='Phone Number'
							placeholder='Enter your phone number'
							value={registration.phone}
							onChange={changeSignupUserPhone}
						/>
						<TextField
							fullWidth
							label='Password'
							placeholder='Enter your password'
							type='password'
							value={registration.password}
							onChange={changeSignupUserPassword}
						/>
						<TextField
							fullWidth
							label='Confirm Password'
							placeholder='Confirm your password'
							type='password'
							value={registration.confirm}
							onChange={changeSignupUserConfirm}
						/>
						<FormControlLabel
							control={
								<Checkbox
									name='TyC'
									required
									value={registration.tyc}
									onChange={changeSignupUserTyC}
								/>
							}
							label='I accept the terms and conditions.'
						/>
						<Button
							type='submit'
							variant='contained'
							color='primary'
							fullWidth
							onClick={(e) => {
								userSignup(e);
							}}>
							Sign up
						</Button>
					</form>
				</Paper>
			</Grid>
			<SnackBarComponent
				catchedError={catchedError}
				setCatchedError={setCatchedError}
			/>
		</section>
	);
};
