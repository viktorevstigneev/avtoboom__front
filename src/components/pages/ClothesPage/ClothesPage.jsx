import React, { useCallback, useEffect, useState } from 'react';
import DoubleSlider from 'double-slider';

// import Footer from '../../common/Footer';

import { clothesType, sexType, cardsData } from './data';
import './style.css';
import { API_URL, POPUP_OVERLAY_CLASSNAME } from '../../../constants';
import Modal from '../../common/Modal';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ClothesPage = () => {
	const [user, setUser] = useState();

	const [sliderMin, setMin] = useState(0);
	const [sliderMax, setMax] = useState(10000);
	const [searchValue, setSearchValue] = useState('');

	const [cardData, setCardData] = useState();
	console.log('cardData: ', cardData);

	const [filteredCards, setFilteredCards] = useState();

	
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
				setCardData(response.data);
				setFilteredCards(response.data);
			});
		};
		getClothes();
		
	}, []);

	useEffect(() => {
		const mySlider = new DoubleSlider(document.getElementById('my-slider'));

		mySlider.addEventListener('slider:change', () => {
			const { min, max } = mySlider.value;
			setMin(min || 0);
			setMax(max || 10000);
		
		});
	}, []);

;

	const handleSearhChange = (evt) => {
		setSearchValue(evt.target.value);
	};

	const [cuzov, setCuzov] = useState('');
	const [engine, setEngine] = useState('');
	const [year, setYear] = useState('');
	const [km, setKm] = useState('');

	return (
		<>
			<main className="clothes">
				<div className="clothes__container">
					<form className="Clothes__top" action="">
						<div className="filter__top">
							<div className="filter__block">
								<h2 className="filter__title">Цена</h2>
								<div id="my-slider" data-min="0" data-max="10000" data-range="10000"></div>
								<div className="filter__price">
									<div className="filter__cost">{sliderMin}BYN</div>
									<div className="filter__cost">{sliderMax}BYN</div>
								</div>
							</div>
							<div className="filter__block">
								<h2 className="filter__title">Тип кузова</h2>
								<select className="filter__wrapper" onChange={(evt) => setCuzov(evt.target.value)}>
									{clothesType.map(({ id, translate }) => (
										<option value={translate}>{translate}</option>
									))}
								</select>
							</div>

							<div className="filter__block">
								<h2 className="filter__title">Тип двигателя</h2>
								<select className="filter__wrapper" onChange={(evt) => setEngine(evt.target.value)}>
									{sexType.map(({ id, translate }) => (
										<option value={translate}>{translate}</option>
									))}
								</select>
							</div>

							<div className="filter__block">
								<h2 className="filter__title">Год выпуска</h2>
								<input
									className="filter__wrapper"
									onChange={(evt) => setYear(evt.target.value)}
									type="number"
									min="1900"
									max="2024"
									step="1"
									defaultValue="2023"
								/>
							</div>

							<div className="filter__block">
								<h2 className="filter__title">Пробег</h2>
								<input
									className="filter__wrapper"
									onChange={(evt) => setKm(evt.target.value)}
									type="number"
									min="0"
									max="10000000"
									step="1"
									defaultValue="0"
								/>
							</div>
						</div>

						<input
							className="filter__search"
							type="text"
							placeholder="введите слово для поиска(поиск автоматический)"
							onChange={handleSearhChange}
						/>

						<div
							className="filter__apply"
							onClick={() => {
								window.location.reload();
							}}
						>
							сбросить фильтры
						</div>
					</form>

					<div className="clothes__content">
						{filteredCards ? (
							filteredCards
								.filter((item) => (km.length == 0 ? item : km.includes(item.miliesKM)))
								.filter((item) => (year.length == 0 ? item : year.includes(item.year)))
								.filter((item) => (cuzov.length == 0 ? item : cuzov.includes(item.typeClothes)))
								.filter((item) => (engine.length == 0 ? item : engine.includes(item.engine)))
								.filter((item) => searchValue == '' || item?.name.includes(searchValue))
								.filter((item) => item.price > sliderMin && item.price < sliderMax)
								.map((item) => (
									<Link to={`/thing/${item._id}`} className="clothes__card">
										{user && user.isAdmin && (
											<span
												className="clothes_card--delete"
												onClick={async (event) => {
													event.stopPropagation();
													event.preventDefault();
													await axios.delete(`${API_URL}/team/${item._id}`, { withCredentials: true });
													window.location.reload();
												}}
											>
												&times;
											</span>
										)}
										<img
											className="clothes__img"
											src={`${API_URL}/getImage/${item.avatar}`}
											// src={item.image}
											alt=""
										/>

										<div className="clothes__bottom">
											<p className="clothes__name">{item.name}</p>
											<p className="clothes__price"> {item.price}BYN</p>
										</div>
									</Link>
								))
						) : (
							<p className="clothes__price">Ничего не найдено</p>
						)}
					</div>
				</div>
			</main>
		</>
	);
};

export default ClothesPage;
