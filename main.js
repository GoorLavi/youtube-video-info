const yt = require('youtube.get-video-info');
const express = require('express')
const ip = require('ip')
const app = express()

let response;

const requestInterval = yt.retrieve('Ga3maNZ0x0w', function (err, res) {
    if (err) throw err;
    response = JSON.stringify(res);
    console.log(response)
});

app.enable('trust proxy');

app.get('/', (req, res) => {

    const clientIp = req.connection.remoteAddress.replace(new RegExp(':', 'g'), '').replace(new RegExp('f', 'g'), '');
    const serverIp = ip.address();

    console.log('clientip: ' + clientIp)
    console.log('serverip: ' + serverIp);

    if (response)
        res.send(JSON.parse(response.replace(serverIp, clientIp)));
    else {
        let requestInterval = setInterval(() => {
            if (response) {
                res.send(JSON.parse(response.replace(serverIp, clientIp)));
                clearInterval(requestInterval)
            }
        }, 80)
    }
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))