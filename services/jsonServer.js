import axios from 'axios';

export const url = 'https://fa22-2806-1000-8003-d6c-2481-2d2f-3c94-f30d.ngrok.io';

export default axios.create({
    baseURL: url
});

