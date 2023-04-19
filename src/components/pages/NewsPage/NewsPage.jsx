import React, { useEffect, useRef, useState } from 'react';
import GLOBE from 'vanta/dist/vanta.globe.min';
import './style.css';
// import axios from 'axios';
// import { API_URL } from '../../../constants';
var today = new Date();

var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

var now = today.toLocaleString('en-US', options);

const news = [
	{
		front: now,
		back:
			'Какие автомобили чаще всего покупали россияне в первом квартале 2023 года и сколько за них сейчас просят продавцы? Ассоциация европейского бизнеса представила свежие данные',
	},
	{
		front: now,
		back:
			'Какие автомобили чаще всего покупали россияне в первом квартале 2023 года и сколько за них сейчас просят продавцы? Ассоциация европейского бизнеса представила свежие данные',
	},
	{
		front: now,
		back:
			'Какие автомобили чаще всего покупали россияне в первом квартале 2023 года и сколько за них сейчас просят продавцы? Ассоциация европейского бизнеса представила свежие данные',
	},
	{
		front: now,
		back:
			'Какие автомобили чаще всего покупали россияне в первом квартале 2023 года и сколько за них сейчас просят продавцы? Ассоциация европейского бизнеса представила свежие данные',
	},
	{
		front: now,
		back:
			'Какие автомобили чаще всего покупали россияне в первом квартале 2023 года и сколько за них сейчас просят продавцы? Ассоциация европейского бизнеса представила свежие данные',
	},
];

const MainPage = () => {
	const [user, setUser] = useState();
	const [newsData, setNewsData] = useState('');

	// useEffect(() => {
	// 	const getBenners = async () => {
	// 		const responseData = await axios
	// 			.get(`${API_URL}/banner`, { withCredentials: true })
	// 			.then((response) => setBannerData(response.data));
	// 	};
	// 	getBenners();
	// }, []);

	return (
		<main className="n__main">
			<div className="n__news">Главные обновления и просто новости автолюбителей</div>

			{/* ------------------------------ */}
			<div id="hexagons">
				<ul id="categories" className="clr">
					{news.map((item) => (
						<li>
							<div className="flip-container" ontouchstart="this.classList.toggle('hover');">
								<div className="flipper">
									<div
										className="front"
										style={{ background: '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase() }}
									>
										<p className="front__caption">{item.front}</p>
									</div>
									<div className="back">
										<div className="flip-content">
											<p>{item.back}</p>
										</div>
									</div>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</main>
	);
};

export default MainPage;
