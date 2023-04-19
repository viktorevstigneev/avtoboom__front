import React, { useEffect, useRef, useState } from 'react';

import './style.css';
// import axios from 'axios';
// import { API_URL } from '../../../constants';

const MainPage = () => {
	const [user, setUser] = useState();
	const [newsData, setNewsData] = useState('');

	return (
		<main className="map">
			<iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2361.8034779238646!2d23.814457196320514!3d53.70394758416701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e078ba68e35fcb%3A0xbb2eadd45a2ccdc9!2z0JPRgNC-0LTQvdC10L3RgdC60LjQuSDQs9C-0YHRg9C00LDRgNGB0YLQstC10L3QvdGL0Lkg0LrQvtC70LvQtdC00LYg0YLQtdGF0L3QuNC60LgsINGC0LXRhdC90L7Qu9C-0LPQuNC5INC4INC00LjQt9Cw0LnQvdCwINC60L7RgNC_0YPRgSAx!5e0!3m2!1sru!2sby!4v1681854246327!5m2!1sru!2sby"
				width="100%"
				height="600px"
				// style="border:0;"
				// allowfullscreen=""
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"
			></iframe>
		</main>
	);
};

export default MainPage;
