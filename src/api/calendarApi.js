import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
    baseURL: VITE_API_URL,
});


// ! configurar interceptores
calendarApi.interceptors.request.use(config => {

    config.headers = {
        'x-token': localStorage.getItem('token')
    };

    return config;
});


export default calendarApi;

// en el archivo de barril
// export {default as calendarApi} from './ruta del file';