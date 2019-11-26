const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');

const app = express();
const port = 3000;

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.get('/', (req, res) => {
    res.json('Hello World');
});

let secret = 'some_secret';

app.use(expressJWT({ secret: secret })
    .unless({
        path: [
            '/token/sign'
        ]
    }));

app.get('/token/sign', (req, res) => {
    const userData = {
        'name': 'Guilherme',
        'id': 1
    }

    let token = jwt.sign(userData, secret, { expiresIn: '15s' });
    res.status(200).json({ 'token': token });
});

app.get('/path1', (req, res) => {
    res.status(200)
        .json({
            'success': true,
            'msg': 'Secret Access Granted'
        })
});

app.listen(port, function () {
    console.log('Listening to ' + port);
});