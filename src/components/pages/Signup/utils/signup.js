import axios from 'axios';

import { API_URL } from '../../../../constants';

const signUp = ({ formData, setUser }) => {
	axios({
		method: 'POST',
		data: {
			username: formData.username,
			password: formData.password,
		},
		withCredentials: true,
		url: `${API_URL}/signup`,
	})
		.then((response) => {
			setUser(response.data);
		})
		.catch((error) => {
			alert('что-то пошло не так, возможно такой пользователь уже существует');
			console.log('error: ', error);
		});
};

export default signUp;
