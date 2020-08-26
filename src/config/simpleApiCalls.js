import axios from "axios";

const createResource = (api, data, token) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${api}`, data, { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const getResource = (api, token) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${api}`, { headers: { Authorization: `Bearer ${token}` }})
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const getResourceById = (api, data, token) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${api}/${data.employeeId}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const updateResource = (api, data, token) => {
    return new Promise((resolve, reject) => {
        axios
            .put(`${api}`, data, { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const deleteResource = (api, data, token) => {
    return new Promise((resolve, reject) => {
        axios({
            method: "delete",
            url: `${api}?employeeId=${data.employeeId}`,
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export {
    createResource,
    getResource,
    getResourceById,
    updateResource,
    deleteResource,
};
