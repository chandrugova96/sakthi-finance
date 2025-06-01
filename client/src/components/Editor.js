import React from 'react'
import Editor from 'ckeditor5-custom-build/build/ckeditor'
import { CKEditor } from '@ckeditor/ckeditor5-react'

import FileRepository from '../repositories/FileRepository';

function uploadAdapter(loader) {
    return {
        upload: () => {
            return new Promise((resolve, reject) => {
                const body = new FormData();
                loader.file.then(async (file) => {
                    body.append("file", file);
                    FileRepository.fileUpload(body).then((result) => {
                        if (result && result.data) {
                            resolve({ default: result.data });
                        } else {
                            reject()
                        }
                    })
                });
            });
        }
    };
}

function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return uploadAdapter(loader);
    };
}

const EditorComponents = ({ value, onChange, index }) => {
    return (
        <CKEditor
            config={{
                licenseKey: "R2NoUkI2RnNKb0pidnFOVzk5dGQ2eWNPRTRoT2RZekFsTGl3UWQrYTREMWV1UU0zMDMrdWJaTGhlVFZxLU1qQXlNekV4TVRFPQ==",
                extraPlugins: [uploadPlugin]
            }}
            editor={Editor}
            data={value}
            onChange={(event, editor) => {
                const data = editor.getData();
                onChange(data, index)
            }}
        />
    )
}

export default EditorComponents;