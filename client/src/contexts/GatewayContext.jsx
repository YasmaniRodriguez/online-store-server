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

	const changeUserName = (e) => {
		setCredentials({
			username: e.target.value,
			password: credentials.password,
		});
	};

	const changeUserPassword = (e) => {
		setCredentials({
			username: credentials.username,
			password: e.target.value,
		});
	};

	const userLogin = (e) => {
		axios
			.post("http://localhost:8080/login", credentials)
			.then((respose) => {
				setLoggedUser(true);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const userLogout = (e) => {
		axios
			.get("http://localhost:8080/logout")
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
			timeout: 10 * 60,
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

	return (
		<GatewayContext.Provider
			value={{
				credentials,
				changeUserName,
				changeUserPassword,
				loggedUser,
				isTimeout,
				userLogin,
				userLogout,
			}}>
			{children}
		</GatewayContext.Provider>
	);
};
