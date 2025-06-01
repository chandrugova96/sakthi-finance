import Repository, { apiUrl } from './Repository';

class TestsRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async get(params) {
        let url = `${apiUrl}/tests`;
        const reponse = await Repository.get(url, { params })
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getOne(params) {
        let url = `${apiUrl}/tests/one`;
        const reponse = await Repository.get(url, { params })
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async cretae(payload) {
        let url = `${apiUrl}/tests`;
        const reponse = await Repository.post(url, payload)
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async update(id, payload) {
        let url = `${apiUrl}/tests/${id}`;
        const reponse = await Repository.put(url, payload)
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async updateStatus(payload) {
        let url = `${apiUrl}/tests/status`;
        const reponse = await Repository.post(url, payload)
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async delete(params) {
        let url = `${apiUrl}/tests`;
        const reponse = await Repository.delete(url, { params })
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }
}

export default new TestsRepository();