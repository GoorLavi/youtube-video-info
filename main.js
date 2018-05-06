const yt = require('youtube.get-video-info');
const express = require('express')
const app = express()

let response;

const requestInterval =

    yt.retrieve('Ga3maNZ0x0w', function (err, res) {
        if (err) throw err;

        response = res;
    });

app.get('/', (req, res) => {
    if (response)
        res.send(response)
    else{
        let requestInterval = setInterval(() => {
            if (response) {
                res.send(response)
                clearInterval(requestInterval)
            }
        }, 80)
    }
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))