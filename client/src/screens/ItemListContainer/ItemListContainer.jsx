import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Typography, makeStyles, CircularProgress } from "@material-ui/core";
import { ItemList } from "../../components/ItemList/ItemList";
import { db } from "../../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { ItemListContainerStyles } from "./ItemListContainerStyles";
import { GatewayContext } from "../../contexts/GatewayContext";

const useStyles = makeStyles((theme) => ItemListContainerStyles(theme));

export const ItemListContainer = () => {
	const { loggedUser } = useContext(GatewayContext);
	const history = useHistory();
	const classes = useStyles();
	const { id: showCategory } = useParams();
	const [availableProducts, setAvailableProducts] = useState([]);

	useEffect(() => {
		const data = getDocs(
			showCategory
				? query(
						collection(db, "products"),
						where("category", "==", showCategory)
				  )
				: collection(db, "products")
		);
		data
			.then((querySnapshot) => {
				const products = querySnapshot.docs.map((product) => {
					//console.log(product._document.data.value.mapValue.fields);
					const myData = product.data;
					const id = product.id;
					const obj = { ...myData, id };
					return obj;
				});
				setAvailableProducts(products);
			})
			.catch((error) => console.log(error));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showCategory]);

	return (
		<section className={classes.container}>
			{showCategory ? (
				<ItemList availableProducts={availableProducts} />
			) : (
				<>
					{availableProducts.length === 0 ? (
						<div className={classes.loading}>
							<CircularProgress />
							<Typography variant='h3'>Cargando...</Typography>
						</div>
					) : (
						<div>
							<ItemList availableProducts={availableProducts} />
						</div>
					)}
				</>
			)}
		</section>
	);
};
