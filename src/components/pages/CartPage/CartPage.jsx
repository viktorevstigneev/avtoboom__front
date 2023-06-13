import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
// import Cards from 'react-credit-cards';
// import 'react-credit-cards/es/styles-compiled.css';

import Footer from '../../common/Footer';

import './style.css';
import { API_URL, POPUP_OVERLAY_CLASSNAME } from '../../../constants';

import Modal from '../../common/Modal';

const CartPage = () => {
	const [user, setUser] = useState();
	const [cartData, setCartData] = useState();
	const [sum, setSum] = useState();
	const [pay, setPay] = useState(false);

	// const [cvc, setCvc] = useState('');
	// const [expiry, setExpiry] = useState('');
	// const [focus, setFocus] = useState('');
	// const [name, setName] = useState('');
	// const [number, setNumber] = useState('');

	useEffect(() => {
		const getCurrentUser = async () => {
			const responseData = await axios
				.get(`${API_URL}/profile`, { withCredentials: true })
				.then((response) => setUser(response.data));
		};
		getCurrentUser();
	}, []);

	useEffect(() => {
		const getClothes = async () => {
			const responseData = await axios.get(`${API_URL}/team`, { withCredentials: true }).then((response) => {
				setCartData(response.data);
			});
		};
		getClothes();
	}, []);

	useEffect(() => {
		const userCart = cartData && cartData.filter((value) => user?.userCart && user?.userCart.includes(value._id));

		const summa =
			userCart &&
			userCart.reduce((sum, elem) => {
				return sum + +elem.price;
			}, 0);

		setSum(summa);
	}, [cartData]);

	const handleModalWindowCloseButtonClick = useCallback((evt) => {
		evt.preventDefault();
		setPay(false);
	}, []);

	const handleModalWindowOverlayClick = useCallback((evt) => {
		if (evt.target.classList.contains(POPUP_OVERLAY_CLASSNAME)) {
			setPay(false);
		}
	}, []);

	const userCart = cartData && cartData.filter((value) => user?.userCart && user?.userCart.includes(value._id));
	const userOrder = cartData && cartData.filter((value) => user?.order && user?.order.includes(value._id));
	console.log('user: ', user);
	console.log('userOrder: ', userOrder);

	return (
		<>
			<main className="cart">
				<div className="cart__container">
					<h2 className="cart__title">Выбранные авто для {user?.username}</h2>
					<div className="cart__content">
						{userCart?.length ? (
							userCart.map((item) => (
								<div className="cart__item">
									<img className="cart__image" src={`${API_URL}/getImage/${item.avatar}`} alt="cart" />
									<p className="cart__price">цена: {item.price}BYM</p>
									<button
										className="cart__delete"
										onClick={async () => {
											await axios.patch(`${API_URL}/profileDeleteFromCart`, { productID: item._id, userID: user._id });
											window.location.reload();
										}}
									>
										удалить
									</button>
								</div>
							))
						) : (
							<p className="empty">в корзине ничего нет</p>
						)}
					</div>

					<div className="cart__bottom">
						<p className="cart__summary">Общее: {sum}BYN</p>
						{userCart?.length ? (
							<button className="cart__button" onClick={() => setPay(true)}>
								продолжить бронирование
							</button>
						) : null}
					</div>
					<p className="empty">Забронированные авто</p>

					<div className="cart__content">
						{userOrder?.length ? (
							userOrder.map((item) => (
								<div className="cart__item">
									<img className="cart__image" src={`${API_URL}/getImage/${item.avatar}`} alt="cart" />
									<p className="cart__price">цена: {item.price}BYM</p>
									{/* <button
										className="cart__delete"
										onClick={async () => {
											await axios.patch(`${API_URL}/profileDeleteFromCart`, { productID: item._id, userID: user._id });
											window.location.reload();
										}}
									>
										удалить
									</button> */}
								</div>
							))
						) : (
							<p className="empty">забронированных к покупке нет</p>
						)}
					</div>
				</div>
			</main>

			{pay && (
				<Modal
					title={'Забронировать'}
					onCloseButtonClick={handleModalWindowCloseButtonClick}
					onOverlayClick={handleModalWindowOverlayClick}
				>
					<div className="pay__wrapper">
						<form
							className="par__form"
							encType="multipart/form-data"
							// method="POST"
							onSubmit={async (evt) => {
								evt.preventDefault();

								const formData = new FormData(evt.target);

								const cars = userCart?.length && userCart.map((item) => item.name);
								// console.log('cars: ', cars);
								formData.append('cars', cars);

								const responseData = await axios({
									method: 'PATCH',
									url: `${API_URL}/profileAddOrder?userId=${user?._id}`,
									data: formData,
									withCredentials: true,
								});

								axios.post('https://formspree.io/f/mwkjgpza', formData);
								window.location.reload();
							}}
						>
							<input className="pay__credit" type="text" name="name" required placeholder="Ваше ФИО" />
							<input
								className="pay__credit"
								type="text"
								name="phone"
								required
								placeholder="Номер телефона"
								maxLength={16}
							/>
							<div className="" style={{ display: 'flex', alignItems: 'center' }}>
								<input
									className="pay__credit"
									type="time"
									id="calling"
									name="calling"
									required
									placeholder="Удобное время для звонка"
									maxLength={16}
								/>
								<label htmlFor="calling">Удобное время для звонка</label>
							</div>

							<input className="pay__credit" type="email" name="email" required placeholder="Ваш email" />

							<button className="pay__button">Заказать</button>
						</form>
					</div>
				</Modal>
			)}
		</>
	);
};

export default CartPage;
