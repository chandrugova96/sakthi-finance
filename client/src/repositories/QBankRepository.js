import Repository, { apiUrl } from './Repository';

class QBankRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async getMainCat(params) {
        let url = `${apiUrl}/questioncategory`;
        const reponse = await Repository.get(url, { params })
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getSubCat(params) {
        let url = `${apiUrl}/questioncategory/sub`;
        const reponse = await Repository.get(url, { params })
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getOneCat(params) {
        let url = `${apiUrl}/questioncategory/one`;
        const reponse = await Repository.get(url, { params })
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async cretae(payload) {
        let url = `${apiUrl}/questioncategory`;
        const reponse = await Repository.post(url, payload)
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async update(id, payload) {
        let url = `${apiUrl}/questioncategory/${id}`;
        const reponse = await Repository.put(url, payload)
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async updateStatus(payload) {
        let url = `${apiUrl}/questioncategory/status`;
        const reponse = await Repository.post(url, payload)
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async delete(params) {
        let url = `${apiUrl}/questioncategory`;
        const reponse = await Repository.delete(url, { params })
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }
}

export default new QBankRepository();