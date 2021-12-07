import axios from 'axios';

export const url = 'http://d2f1-2806-1000-8003-45e4-d043-20f9-1e70-436c.ngrok.io';

export default axios.create({
    baseURL: url
});

