import React, { useEffect, useRef, useState } from 'react';
import GLOBE from 'vanta/dist/vanta.globe.min';
import './style.css';
// import axios from 'axios';
// import { API_URL } from '../../../constants';


const MainPage = () => {
	const [user, setUser] = useState();
	const [newsData, setNewsData] = useState('Новое пополнение коллекции. Добавлены женская грудная защита');

	// useEffect(() => {
	// 	const getBenners = async () => {
	// 		const responseData = await axios
	// 			.get(`${API_URL}/banner`, { withCredentials: true })
	// 			.then((response) => setBannerData(response.data));
	// 	};
	// 	getBenners();
	// }, []);

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
					color: 0x8e5b6f,
					color2: 0x81de28,
					backgroundColor: 0x0,
					size: 1.0,
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
			<p className="home_caption">Лучший вариант для покупки автомобиля</p>
		</main>
	);
};

export default MainPage;
