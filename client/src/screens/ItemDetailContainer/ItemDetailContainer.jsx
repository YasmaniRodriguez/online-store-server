import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { CartContext } from "../../contexts/CartContext";
import { ItemDetail } from "../../components/ItemDetail/ItemDetail";
import { db } from "../../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { ItemDetailContainerStyles } from "./ItemDetailContainerStyles";
import { GatewayContext } from "../../contexts/GatewayContext";

const useStyles = makeStyles((theme) => ItemDetailContainerStyles(theme));

export const ItemDetailContainer = (props) => {
	const { loggedUser, setLoggedUser, isTimeout } = useContext(GatewayContext);
	const history = useHistory();
	const classes = useStyles();
	const { id: onlyShowProduct } = useParams();
	const [quantity, setQuantity] = useState(1);
	const [showCheckOut, setShowCheckOut] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState({});
	const { addItemToCart, calcRowAmount } = useContext(CartContext);

	useEffect(() => {
		const data = getDocs(
			query(collection(db, "products"), where("id", "==", onlyShowProduct))
		);

		data
			.then((doc) => {
				console.log(doc);
				setSelectedProduct({ id: doc.id, ...doc.data() });
			})
			.catch((error) => console.log(error));
	}, [onlyShowProduct]);

	return (
		<section className={classes.container}>
			<ItemDetail
				selectedProduct={selectedProduct}
				quantity={quantity}
				addItemToCart={addItemToCart}
				calcRowAmount={calcRowAmount}
				setQuantity={setQuantity}
				showCheckOut={showCheckOut}
				setShowCheckOut={setShowCheckOut}
			/>
		</section>
	);
};
