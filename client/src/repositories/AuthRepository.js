import Repository, { apiUrl } from './Repository';

class AuthRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async login(payload) {
        const reponse = await Repository.post(`${apiUrl}/auth/login`, payload)
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getVillage() {
        const reponse = await Repository.get(`${apiUrl}/village`)
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getUsers(villageId) {
        const reponse = await Repository.get(`${apiUrl}/village/users?villageId=${villageId}`,)
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }
}

export default new AuthRepository();