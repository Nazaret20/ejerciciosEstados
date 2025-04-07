import { useReducer, useState } from "react";
import Card from "../../components/Card";
import "../../styles/useReducer.css";

const ShoppingCart = () => {
	const shopProducts = [
		{ id: 1, name: "Helado", price: "2,40", quantity: 1 },
		{ id: 2, name: "Patatas", price: "1,80", quantity: 2 },
		{ id: 3, name: "Pollo", price: "5,00", quantity: 1 },
		{ id: 4, name: "Ensalada", price: "2,10", quantity: 3 },
		{ id: 5, name: "Kitkat", price: "2,30", quantity: 4 },
		{ id: 6, name: "Pan", price: "1,00", quantity: 2 },
		{ id: 7, name: "Chorizo", price: "2,50", quantity: 4 },
		{ id: 8, name: "Queso", price: "3,00", quantity: 1 },
	];

	const cartUserState = {
		items: [],
		totalPrice: 0,
	};

	const calculateTotalPrice = (items) => {
		return items.reduce((total, item) => total + item.quantity * parseFloat(item.price.replace(",", ".")), 0);
	};

	const reducer = (state, action) => {
		switch (action.type) {
			case "ADD_TO_CART": {
				const productExist = state.items.find((item) => item.id === action.payload.id);
				let updatedItems;

				if (productExist) {
					// Si el producto ya existe en el carrito
					updatedItems = state.items.map((item) =>
						item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
					);
				} else {
					// Si el producto no existe en el carrito
					updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
				}

				return {
					...state,
					items: updatedItems,
					totalPrice: calculateTotalPrice(updatedItems),
				};
			}

			case "REMOVE_FROM_CART": {
				const productExist = state.items.find((item) => item.id === action.payload.id);

				if (!productExist) return state;

				let updatedItems;

				if (productExist.quantity === 1) {
					// Si solo hay una unidad, eliminamos el producto
					updatedItems = state.items.filter((item) => item.id !== action.payload.id);
				} else {
					// Si hay más de una unidad, reducimos la cantidad
					updatedItems = state.items.map((item) =>
						item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
					);
				}

				return {
					...state,
					items: updatedItems,
					totalPrice: calculateTotalPrice(updatedItems),
				};
			}

			case "DELETE_FROM_CART": {
				// Eliminar el producto del carrito completamente
				const updatedItems = state.items.filter((item) => item.id !== action.payload.id);

				return {
					...state,
					items: updatedItems,
					totalPrice: calculateTotalPrice(updatedItems),
				};
			}

			case "CLEAR_CART":
				return {
					...state,
					items: [],
					totalPrice: 0,
				};

			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(reducer, cartUserState);

	return (
		<Card title={"Shopping Cart"}>
			<section className="card-shop">
				<div className="div-shop">
					<p className="p-shop">Productos disponibles 🛍️</p>
					<ul className="ul-shop">
						{shopProducts.map((product) => (
							<li className="li-shop" key={product.id}>
								<span className="span-shop">{product.name}</span>
								<span className="span-shop-price">{product.price}€</span>
								<button
									className="button-shop"
									onClick={() =>
										dispatch({
											type: "ADD_TO_CART",
											payload: product,
										})
									}
								>
									Añadir
								</button>
							</li>
						))}
					</ul>
				</div>

				<div className="div-cart">
					<p className="p-cart">Tu carrito 🛒</p>
					<ul className="ul-cart">
						{state.items.length === 0 ? (
							<p className="empty-cart">El carrito está vacío</p>
						) : (
							state.items.map((item) => (
								<li className="li-cart" key={item.id}>
									<span className="span-cart">{item.name}</span>
									<span className="span-cart"> {(parseFloat(item.price.replace(",", ".")) * item.quantity).toFixed(2)}€</span>
									<span className="span-cart">{item.quantity}</span>
									<button
										className="button-cart-shop"
										onClick={() =>
											dispatch({
												type: "ADD_TO_CART",
												payload: item,
											})
										}
									>
										➕
									</button>
									<button
										className="button-cart-shop"
										onClick={() =>
											dispatch({
												type: "REMOVE_FROM_CART",
												payload: item,
											})
										}
									>
										➖
									</button>
									<button
										className="button-cart-shop"
										onClick={() =>
											dispatch({
												type: "DELETE_FROM_CART",
												payload: item,
											})
										}
									>
										❌
									</button>
								</li>
							))
						)}
					</ul>
					<div className="div-final-cart">
						<p className="p-final-cart">Total: {state.totalPrice.toFixed(2)}</p>
						<button
							className="button-shop"
							onClick={() =>
								dispatch({
									type: "CLEAR_CART",
								})
							}
						>
							Vaciar carrito
						</button>
					</div>
				</div>
			</section>
		</Card>
	);
};

export default ShoppingCart;

/*.map()

	Recorre cada elemento del array.

	Devuelve un nuevo array del mismo tamaño.

	En nuestro caso, puede devolver:

	Una copia del producto con la cantidad modificada.

	O null si queremos eliminar ese producto.

.filter()

	Recorre el array resultante del .map().

	Devuelve un nuevo array filtrando los elementos.

	En este caso, se queda solo con los que no son null.*/
