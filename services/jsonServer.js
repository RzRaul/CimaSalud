import axios from 'axios';

export const url = 'http://1132-2806-1000-8003-7dc-dc95-2fe8-feb0-d20c.ngrok.io';

export default axios.create({
    baseURL: url
});

