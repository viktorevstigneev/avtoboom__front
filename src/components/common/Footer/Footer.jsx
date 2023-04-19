import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../img/logo.png';
import './style.css';

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer__container">
				<img className="header__logo" src={logo} alt="logo" />
				<p className="footer__description"> avto boom самое лучшее решение для покупки авто</p>
			</div>
		</footer>
	);
};

export default Footer;
