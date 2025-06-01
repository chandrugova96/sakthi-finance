import Repository, { apiUrl } from './Repository';

class FileRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async fileUpload(formdata) {
        let url = `${apiUrl}/file/`;
        const reponse = await Repository.post(url, formdata)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return error.response.data;
            });
        return reponse;
    }

}

export default new FileRepository();