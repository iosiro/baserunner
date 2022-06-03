const express = require('express');
const fs = require('fs');
const https = require('https');
const app = express();
const path = require('path');
 
app.use(express.static('dist'));

if (process.argv[2] == '443') {
    var options = {
        key: fs.readFileSync('selfsigned.key'),
        cert: fs.readFileSync('selfsigned.crt')
    }
    https.createServer(options, app).listen(443);
} else {
    app.listen(parseInt(process.argv[2]));
}
