/* eslint-disable */
import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
export const GatewayContext = createContext();
import { IdleTimeoutManager } from "idle-timer-manager";
const socket = io("http://localhost:8080", {
	// withCredentials: true,
	// forceNew: true,
	//reconnectionAttempts: "Infinity",
	//timeout: 20000,
	//transports: ["websocket", "polling"],
});

socket.connect();

export const GatewayContextProvider = ({ children }) => {
	const [loggedUser, setLoggedUser] = useState({
		logged: false,
		photo: "",
	});
	const history = useHistory();
	const [isTimeout, setIsTimeout] = useState(false);
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});

	const [registration, setRegistration] = useState({
		name: "",
		email: "",
		gender: "",
		phone: "",
		password: "",
		confirm: "",
		tyc: "",
	});

	const [catchedError, setCatchedError] = useState({
		open: false,
		message: "",
	});

	const changeSigninUserName = (e) => {
		setCredentials({ ...credentials, email: e.target.value });
	};

	const changeSigninUserPassword = (e) => {
		setCredentials({ ...credentials, password: e.target.value });
	};

	const changeSignupUserName = (e) => {
		setRegistration({ ...registration, name: e.target.value });
	};

	const changeSignupUserEmail = (e) => {
		setRegistration({ ...registration, email: e.target.value });
	};

	const changeSignupUserGender = (e) => {
		setRegistration({ ...registration, gender: e.target.value });
	};

	const changeSignupUserPhone = (e) => {
		setRegistration({ ...registration, phone: e.target.value });
	};

	const changeSignupUserPassword = (e) => {
		setRegistration({ ...registration, password: e.target.value });
	};

	const changeSignupUserConfirm = (e) => {
		setRegistration({ ...registration, confirm: e.target.value });
	};

	const changeSignupUserTyC = (e) => {
		setRegistration({ ...registration, tyc: e.target.checked });
	};

	const userSignin = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:8080/signin", credentials)
			.then((response) => {
				setLoggedUser({ ...loggedUser, logged: true });
				history.push("/");
			})
			.catch((error) => {
				setCatchedError({ open: true, message: error.response.data.error });
			});
	};

	const userSigninWithFacebook = (response) => {
		console.log(response.picture.data.url);
		setLoggedUser({ logged: true, photo: response.picture.data.url });
		history.push("/");
		//e.preventDefault();
		// axios
		// 	.get("http://localhost:8080/signin/facebook")
		// 	.then((response) => {
		// 		setLoggedUser(true);
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	});
	};

	const userSignup = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:8080/signup", registration)
			.then((response) => {
				history.push("/signin");
			})
			.catch((error) => {
				setCatchedError({ open: true, message: error.response.data.error });
			});
	};

	const userSignout = (e) => {
		axios
			.get("http://localhost:8080/signout")
			.then((response) => {
				setLoggedUser(false);
				history.push("/");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		const manager = new IdleTimeoutManager({
			timeout: 10,
			onExpired: () => {
				setLoggedUser(false);
				setIsTimeout(true);
			},
		});

		return () => {
			manager.clear();
		};
	}, []);

	useEffect(() => {
		socket.on("connection", (data) => {
			console.log(data);
		});
	}, []);

	useEffect(() => {
		if (!loggedUser.logged) {
			history.push("/signin");
		}
	}, [loggedUser.logged]);

	useEffect(() => {
		if (loggedUser.logged && isTimeout) {
			userSignout();
		}
	}, [isTimeout]);

	return (
		<GatewayContext.Provider
			value={{
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
				loggedUser,
				isTimeout,
				userSignin,
				userSigninWithFacebook,
				userSignup,
				userSignout,
				catchedError,
				setCatchedError,
			}}>
			{children}
		</GatewayContext.Provider>
	);
};
