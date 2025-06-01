import Repository, { apiUrl } from './Repository';

class TestCategoryRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async getMainCat(params) {
        let url = `${apiUrl}/testcategory`;
        const reponse = await Repository.get(url, { params })
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getSubCat(params) {
        let url = `${apiUrl}/testcategory/sub`;
        const reponse = await Repository.get(url, { params })
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getOneCat(params) {
        let url = `${apiUrl}/testcategory/one`;
        const reponse = await Repository.get(url, { params })
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async cretae(payload) {
        let url = `${apiUrl}/testcategory`;
        const reponse = await Repository.post(url, payload)
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async update(id, payload) {
        let url = `${apiUrl}/testcategory/${id}`;
        const reponse = await Repository.put(url, payload)
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async updateStatus(payload) {
        let url = `${apiUrl}/testcategory/status`;
        const reponse = await Repository.post(url, payload)
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async delete(params) {
        let url = `${apiUrl}/testcategory`;
        const reponse = await Repository.delete(url, { params })
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }
}

export default new TestCategoryRepository();