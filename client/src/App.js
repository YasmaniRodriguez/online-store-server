import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { BusinessContextProvider } from "./contexts/BusinessContext";
import { CartContextProvider } from "./contexts/CartContext";
import { NavBar } from "./components/NavBar/NavBar";
import { Footer } from "./components/Footer/Footer";
import { ItemListContainer } from "./screens/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./screens/ItemDetailContainer/ItemDetailContainer";
import { CartContainer } from "./screens/CartContainer/CartContainer";
import { GatewayContainer } from "./screens/GatewayContainer/GatewayContainer";
import { TrackingContainer } from "./screens/TrackingContainer/TrackingContainer";

const App = (props) => {
	return (
		<BusinessContextProvider>
			<CartContextProvider>
				<BrowserRouter>
					<Switch>
						<Route exact path='/'>
							<NavBar />
							<ItemListContainer />
						</Route>
						<Route exact path='/:gateway'>
							<GatewayContainer />
						</Route>
						<Route path='/category/:id'>
							<NavBar />
							<ItemListContainer />
						</Route>
						<Route path='/product/:id'>
							<NavBar />
							<ItemDetailContainer />
						</Route>
						<Route path='/tracking'>
							<NavBar />
							<TrackingContainer />
						</Route>
						<Route path='/cart'>
							<NavBar />
							<CartContainer />
						</Route>
					</Switch>
					<Footer />
				</BrowserRouter>
			</CartContextProvider>
		</BusinessContextProvider>
	);
};

export default App;
