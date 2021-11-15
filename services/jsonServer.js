import axios from 'axios';
export const url = 'http://f983-2806-1000-8003-d6c-59a6-362f-9ed9-f3fa.ngrok.io';
export default axios.create({
    baseURL: url
});

