import Repository, { apiUrl } from './Repository';

class TestQuestionsRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async get(params) {
        let url = `${apiUrl}/testquestions`;
        const reponse = await Repository.get(url, { params })
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async assign(payload) {
        let url = `${apiUrl}/testquestions/assign`;
        const reponse = await Repository.post(url, payload)
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async remove(payload) {
        let url = `${apiUrl}/testquestions/remove`;
        const reponse = await Repository.post(url, payload)
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async update(payload) {
        let url = `${apiUrl}/testquestions/update`;
        const reponse = await Repository.post(url, payload)
            .then(response => {
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    }

}

export default new TestQuestionsRepository();