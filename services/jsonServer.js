import axios from 'axios';

export const url = 'http://482a-2806-1000-8003-5512-a15f-61d-a55b-a1b3.ngrok.io';

export default axios.create({
    baseURL: url
});

