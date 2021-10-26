import React from "react";
import { Typography, makeStyles, CircularProgress } from "@material-ui/core";
import { Item } from "../Item/Item.jsx";
import { ItemListStyles } from "./ItemListStyles";

const useStyles = makeStyles((theme) => ItemListStyles(theme));

export const ItemList = ({ loading, showCategory, availableProducts }) => {
	const classes = useStyles();

	return (
		<>
			{loading ? (
				<div className={classes.loading}>
					<CircularProgress />
					<Typography variant='h3'>Cargando...</Typography>
				</div>
			) : (
				<div className={classes.container}>
					{availableProducts?.map((product, i) => (
						<Item key={i} {...product} />
					))}
				</div>
			)}
		</>
	);
};
