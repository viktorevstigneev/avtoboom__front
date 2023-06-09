import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../img/logo.png';
import inst from '../../../img/inst.png';

import viber from '../../../img/viber.png';
import what from '../../../img/what.png';
import './style.css';

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer__container">
				<img className="header__logo" src={logo} alt="logo" />
				<div className="footer__wrapp">
					<a href="https://instagram.com/_avtoboom?igshid=NTc4MTIwNjQ2YQ==" className="footer__description">
						<img className="footer__inst" src={inst} alt="" srcset="" />
					</a>

					<a href="viber://chat?number=%2B80152484263">
						<img className="footer__inst" src={viber} alt="" srcset="" />
					</a>
					<a href="https://api.whatsapp.com/send/?phone=80152484263">
						<img className="footer__inst" src={what} alt="" srcset="" />
					</a>
					<a href="tel:+80152484263" className="footer__description">
						8 0152 48-42-63
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
