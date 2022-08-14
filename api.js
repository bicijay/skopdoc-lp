import axios from "axios";
import {supabaseClient} from "./supabase";

export const skopdocApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_KEY
});

skopdocApi.interceptors.request.use(
    config => {
        if (supabaseClient.auth?.session()?.access_token) {
            config.headers['x-auth-token'] = supabaseClient.auth?.session()?.access_token;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);