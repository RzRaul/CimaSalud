import axios from 'axios';

export const url = 'http://dc7e-2806-1000-8003-2cd2-99bb-863f-3010-4da0.ngrok.io';

export default axios.create({
    baseURL: url
});

