import Repository, { apiUrl } from './Repository';

class AdminRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async login(payload) {
        const reponse = await Repository.post(`${apiUrl}/admin/login`, payload)
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }

}

export default new AdminRepository();