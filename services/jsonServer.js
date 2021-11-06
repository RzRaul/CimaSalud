import axios from 'axios';
export const url = 'http://52bc-2806-1000-8003-2e53-28b9-7564-30c6-f4dd.ngrok.io';
export default axios.create({
    baseURL: url
});

