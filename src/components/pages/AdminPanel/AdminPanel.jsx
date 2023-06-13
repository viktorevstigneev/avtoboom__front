import React, { useCallback, useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import Header from '../../common/Header';

import './style.css';

import { API_URL } from '../../../constants';
import { clothesType, sexType } from '../ClothesPage/data';

const AdminPanel = () => {
	const [file, setFile] = useState('');

	return (
		<section className="admin">
			<h1 className="admin__title">Страница администратора</h1>
			<form
				className="admin__person"
				encType="multipart/form-data"
				// method="POST"
				onSubmit={async (evt) => {
					evt.preventDefault();

					const formData = new FormData(evt.target);

					const responseData = await axios({
						method: 'POST',
						url: `${API_URL}/team`,
						data: formData,
						withCredentials: true,
					});
					window.location.reload();
				}}
			>
				<div className="admin__block">
					<label className="admin__label" htmlFor="avatar">
						<img
							className="admin__avatar"
							src={file ? URL.createObjectURL(file) : `${API_URL}/getImage/default.jpeg`}
							alt="menu_picture"
						/>
						<div className="admin__icon">+</div>
					</label>
					<input
						className="admin__input"
						id="avatar"
						name="avatar"
						type="file"
						onChange={(evt) => setFile(evt.target.files[0])}
					/>
				</div>

				<div className="admin__right">
					<label className="music__label" htmlFor="name">
						Название
					</label>
					<input className="admin__text-input" type="text" name="name" id="name" />

					<label className="music__label" htmlFor="type">
						тип кузова
					</label>
					<select className="admin__text-input" name="typeClothes" id="type">
						{clothesType.map(({ id, translate }) => (
							<option className="option__item" data-value={id} key={id}>
								{translate}
							</option>
						))}
					</select>

					<label className="music__label" htmlFor="year">
						год выпуска
					</label>
					<input
						className="admin__text-input"
						type="number"
						min="1900"
						max="2024"
						step="1"
						defaultValue="2023"
						name="year"
						id="year"
					/>

					<label className="music__label" htmlFor="miliesKM">
						пробег автомобиля(km)
					</label>
					<input
						className="admin__text-input"
						min="0"
						max="1000000000"
						step="1"
						defaultValue="0"
						name="miliesKM"
						id="miliesKM"
					/>

					<label className="music__label" htmlFor="engine">
						Тип двигателя
					</label>
					<select className="admin__text-input" name="engine" id="engine">
						{sexType.map(({ id }) => (
							<option className="option__item" data-value={id} key={id}>
								{id}
							</option>
						))}
					</select>

					<label className="music__label" htmlFor="decript">
						описание
					</label>
					<input className="admin__text-input" type="text" name="description" id="descript" />

					<label className="music__label" htmlFor="price">
						цена
					</label>
					<input className="admin__text-input" type="number" min="0" name="price" id="price" />
					<button className="admin__button" type="submit">
						добавить автомобиль
					</button>
				</div>
			</form>
		</section>
	);
};

AdminPanel.propTypes = {
	team: PropTypes.object,
	loadTeamData: PropTypes.func,
};

AdminPanel.defaultProps = {
	team: {},
	loadTeamData: () => {},
};
export default AdminPanel;
