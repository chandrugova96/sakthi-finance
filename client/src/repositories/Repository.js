import axios from 'axios';
export const apiUrl = "http://localhost:4143/v1";

let customHeaders = {
    Accept: 'application/json'
};

let local = typeof window !== 'undefined' ? localStorage : null;
if (local && local.usertoken) {
    customHeaders['x-auth-token'] = local.usertoken;
}

export default axios.create({
    headers: customHeaders,
});