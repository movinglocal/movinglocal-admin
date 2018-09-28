import { BASE_URL, UPLOAD_PATH } from '../config';

/**
 * For posts update only, convert uploaded image in base 64 and attach it to
 * the `picture` sent property, with `src` and `title` attributes.
 */
const addUploadFeature = requestHandler => async (type, resource, params) => {
    if (type === 'UPDATE' || type === 'CREATE') {
        if (params.data.image) {
            // only freshly dropped pictures are instance of File
            if (!(params.data.image.rawFile instanceof File)) return requestHandler(type, resource, params);
            const url = `${BASE_URL}${UPLOAD_PATH}`;
            const data = params.data.image.rawFile;
            const formData = new FormData();
            formData.append('files', data);

            const token = localStorage.getItem('token');
            const headers = new Headers({
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            });

            const req = await fetch(url, {
                method: 'POST',
                body: formData,
                headers
            });

            const res = await req.json();

            return requestHandler(type, resource, {
                ...params,
                data: {
                    ...params.data,
                    image: res
                }
            })
        }
    }
    // for other request types and reources, fall back to the defautl request handler
    return requestHandler(type, resource, params);
};

export default addUploadFeature;
