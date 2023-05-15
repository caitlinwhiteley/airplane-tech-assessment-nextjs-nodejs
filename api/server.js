import express, { json } from 'express';
import cors from 'cors';

import { callApi } from './get-planes.js';

const app = express();
const port = 3001;

app.use(json());
app.use(cors());

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

app.get('/api/:type/:query', (req, res) => {
    const url = `/flights/${req.params.type}?${req.params.query}`;
    callApi(function (response) {
        res.write(JSON.stringify(response));
        res.end();
    }, url);
});
