import React, { useEffect, useRef, useState } from 'react';
import GLOBE from 'vanta/dist/vanta.globe.min';
import './style.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../constants';
// import axios from 'axios';
// import { API_URL } from '../../../constants';

const MainPage = () => {
	const [user, setUser] = useState();
	const [newsData, setNewsData] = useState('Новое пополнение коллекции. Добавлены женская грудная защита');
	const [cardData, setCardData] = useState();

	useEffect(() => {
		const gethome = async () => {
			const responseData = await axios.get(`${API_URL}/team`, { withCredentials: true }).then((response) => {
				setCardData(response.data);
			});
		};
		gethome();
	}, []);

	const randomInteger = (min, max) => {
		// получить случайное число от (min-0.5) до (max+0.5)
		let rand = min - 0.5 + Math.random() * (max - min + 1);
		return Math.round(rand);
	};

	const [vantaEffect, setVantaEffect] = useState(null);
	const myRef = useRef(null);
	useEffect(() => {
		if (!vantaEffect) {
			setVantaEffect(
				GLOBE({
					el: myRef.current,
					mouseControls: true,
					touchControls: true,
					gyroControls: false,
					minHeight: 200.0,
					minWidth: 200.0,
					scale: 1.0,
					scaleMobile: 1.0,
					color: 0x0,
					color2: 0xff0000,
					size: 1.5,
					backgroundColor: 0xaaaaaa,
				})
			);
		}
		return () => {
			if (vantaEffect) vantaEffect.destroy();
		};
	}, [vantaEffect]);

	return (
		<main
			className="home__main"
			 ref={myRef}
		>
			<h1 className="home__title">Avto Boom</h1>
			<p className="home_caption">
				Добро пожаловать!!!
				<br /> авто бум - это удобный способ купить <br /> или продать авто. Объявления о продаже новых <br /> и
				подержанных автомобилей.
			</p>

			<p className="home__sub">Популярные авто</p>

			<div className="home__aktion">
				{cardData ? (
					cardData
						.filter((item, index) => index % 2 === 0)
						.map((item) => (
							<Link to={`/thing/${item._id}`} className="home__card">
								{user && user.isAdmin && (
									<span
										className="home_card--delete"
										onClick={async (event) => {
											event.stopPropagation();
											await axios.delete(`${API_URL}/team/${item._id}`, { withCredentials: true });
										}}
									>
										&times;
									</span>
								)}
								<img
									className="home__img"
									src={`${API_URL}/getImage/${item.avatar}`}
									// src={item.image}
									alt=""
								/>

								<div className="home__bottom">
									<p className="home__name">{item.name}</p>
									<p className="home__price"> {item.price}BYN</p>
								</div>
							</Link>
						))
				) : (
					<p className="home__price">Ничего не найдено</p>
				)}
			</div>

			<p className="home__sub">Акции</p>

			<div className="home__aktion">
				{cardData ? (
					cardData
						.filter((item, index) => index % 5 === 0)
						.map((item) => (
							<Link to={`/thing/${item._id}`} className="home__card">
								{user && user.isAdmin && (
									<span
										className="home_card--delete"
										onClick={async (event) => {
											event.stopPropagation();
											await axios.delete(`${API_URL}/team/${item._id}`, { withCredentials: true });
										}}
									>
										&times;
									</span>
								)}
								<img
									className="home__img"
									src={`${API_URL}/getImage/${item.avatar}`}
									// src={item.image}
									alt=""
								/>

								<div className="home__bottom">
									<p className="home__name">{item.name}</p>
									<p className="home__price">
										<i style={{ textDecoration: 'line-through' }}>{randomInteger(10000000, 1200000)} BYN</i> {item.price}BYN
									</p>
								</div>
							</Link>
						))
				) : (
					<p className="home__price">Ничего не найдено</p>
				)}
			</div>
		</main>
	);
};

export default MainPage;
