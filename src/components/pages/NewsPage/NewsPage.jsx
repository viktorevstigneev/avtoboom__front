import React, { useEffect, useRef, useState } from 'react';
import GLOBE from 'vanta/dist/vanta.globe.min';
import './style.css';
import axios from 'axios';
import { API_URL } from '../../../constants';
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

const MainPage = ({ user }) => {
	const [newsData, setNewsData] = useState('');
	console.log('newsData: ', newsData);
	const [text, setText] = useState();

	useEffect(() => {
		const getBenners = async () => {
			const responseData = await axios
				.get(`${API_URL}/banner`, { withCredentials: true })
				.then((response) => setNewsData(response.data));
		};
		getBenners();
	}, []);

	return (
		<main className="n__main">
			<div className="n__news">Главные обновления и просто новости автолюбителей</div>

			{/* ------------------------------ */}
			<div id="hexagons">
				<ul id="categories" className="clr">
					{newsData &&
						newsData.map((item) => (
							<li>
								<div className="flip-container" ontouchstart="this.classList.toggle('hover');">
									<div className="flipper">
										<div
											className="front"
											style={{
												background: '#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase(),
											}}
										>
											<p className="front__caption">{new Date(item.front).toLocaleString()}</p>
										</div>
										<div className="back">
											<div className="flip-content">
												<p>{item.back}</p>
												{user && user.isAdmin ? (
													<p
														className="delete__new"
														onClick={() => {
															axios.post(`${API_URL}/deleteBanner?id=${item._id}`);
															window.location.reload();
														}}
													>
														удалить
													</p>
												) : null}
											</div>
										</div>
									</div>
								</div>
							</li>
						))}
				</ul>
			</div>

			{user && user.isAdmin ? (
				<form className="news__form">
					<textarea
						className="news__text"
						name="back"
						value={text}
						onChange={(evt) => setText(evt.target.value)}
						required
						placeholder="Введите новость"
					></textarea>
					<button
						className="news_btn"
						onClick={async (evt) => {
							evt.preventDefault();
							axios.post(`${API_URL}/banner`, { back: text });
							window.location.reload();
						}}
					>
						добавить новость
					</button>
				</form>
			) : null}
		</main>
	);
};

export default MainPage;
