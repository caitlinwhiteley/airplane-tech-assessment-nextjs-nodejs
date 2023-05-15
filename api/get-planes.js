import request from 'request';

const url = 'https://opensky-network.org/api';

const getPlanes = (callback, urlparams) => {
    const newUrl = url + urlparams;

    request(newUrl, { json: true }, (err, res, body) => {
        if (err) return callback(err);
        return callback(body);
    });
};

export const callApi = getPlanes;
