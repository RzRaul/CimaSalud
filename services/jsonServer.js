import axios from 'axios';

export const url = 'http://b751-2806-1000-8003-2cd2-a090-1a19-dea8-5b5d.ngrok.io';

export default axios.create({
    baseURL: url
});

