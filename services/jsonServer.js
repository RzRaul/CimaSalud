import axios from 'axios';

export const url = 'http://6534-2806-1000-8003-45e4-5f9-d90b-ff02-454e.ngrok.io';

export default axios.create({
    baseURL: url
});

