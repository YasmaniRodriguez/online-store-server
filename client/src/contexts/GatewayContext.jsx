/* eslint-disable */
import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
export const GatewayContext = createContext();
const socket = io("http://localhost:8080", {
	// withCredentials: true,
	// forceNew: true,
	//reconnectionAttempts: "Infinity",
	//timeout: 20000,
	//transports: ["websocket", "polling"],
});

socket.connect();

class IdleTimer {
	constructor({ timeout, onTimeout, onExpired }) {
		this.timeout = timeout;
		this.onTimeout = onTimeout;

		const expiredTime = parseInt(localStorage.getItem("_expiredTime"), 10);
		if (expiredTime > 0 && expiredTime < Date.now()) {
			onExpired();
			return;
		}

		this.eventHandler = this.updateExpiredTime.bind(this);
		this.tracker();
		this.startInterval();
	}

	startInterval() {
		this.updateExpiredTime();

		this.interval = setInterval(() => {
			const expiredTime = parseInt(localStorage.getItem("_expiredTime"), 10);
			if (expiredTime < Date.now()) {
				if (this.onTimeout) {
					this.onTimeout();
					this.cleanUp();
				}
			}
		}, 1000);
	}

	updateExpiredTime() {
		if (this.timeoutTracker) {
			clearTimeout(this.timeoutTracker);
		}
		this.timeoutTracker = setTimeout(() => {
			localStorage.setItem("_expiredTime", Date.now() + this.timeout * 1000);
		}, 300);
	}

	tracker() {
		window.addEventListener("mousemove", this.eventHandler);
		window.addEventListener("scroll", this.eventHandler);
		window.addEventListener("keydown", this.eventHandler);
	}

	cleanUp() {
		localStorage.removeItem("_expiredTime");
		clearInterval(this.interval);
		window.removeEventListener("mousemove", this.eventHandler);
		window.removeEventListener("scroll", this.eventHandler);
		window.removeEventListener("keydown", this.eventHandler);
	}
}

export const GatewayContextProvider = ({ children }) => {
	const [loggedUser, setLoggedUser] = useState(false);
	const history = useHistory();
	const [isTimeout, setIsTimeout] = useState(false);
	const [credentials, setCredentials] = useState({
		username: "",
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

	const changeSigninUserName = (e) => {
		setCredentials({ ...credentials, username: e.target.value });
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
		console.log(registration);
		setRegistration({ ...registration, tyc: e.target.checked });
	};

	const userSignin = (e) => {
		axios
			.post("http://localhost:8080/signin", credentials)
			.then((respose) => {
				setLoggedUser(true);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const userSignup = (e) => {
		axios
			.post("http://localhost:8080/signup", registration)
			.then((respose) => {
				history.push("/signin");
			})
			.catch((error) => {
				console.log(error);
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
		const timer = new IdleTimer({
			timeout: 10,
			onTimeout: () => {
				setIsTimeout(true);
			},
			onExpired: () => {
				setLoggedUser(false);
				setIsTimeout(true);
			},
		});

		return () => {
			timer.cleanUp();
		};
	}, []);

	useEffect(() => {
		socket.on("connection", (data) => {
			console.log(data);
		});
	}, []);

	useEffect(() => {
		if (!loggedUser) {
			history.push("/signin");
		}
	}, [loggedUser]);

	useEffect(() => {
		if (loggedUser && isTimeout) {
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
				userSignup,
				userSignout,
			}}>
			{children}
		</GatewayContext.Provider>
	);
};
