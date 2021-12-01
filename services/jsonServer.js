import axios from 'axios';

export const url = 'http://0b07-2806-1000-8003-45e4-9504-aa73-e41-ecf8.ngrok.io';

export default axios.create({
    baseURL: url
});

