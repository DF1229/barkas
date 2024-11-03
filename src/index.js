require('dotenv').config({ path: '../.env' });
const { DatabaseManager } = require('./db/DatabaseManager');
const app = require('./app');

(async () => {
    await runHttp();
    if (process.env.ENVIRONMENT == 'PROD')
        await runHttps();

    if (!new DatabaseManager())
        return console.log(`${new Date().toLocaleString()} | Database connection failed`);

    console.log(`${new Date().toLocaleString()} | Startup complete`);
})();

async function runHttp() {
    const http = require('http');
    const httpServer = http.createServer(app);
    const HTTP_PORT = 80;

    httpServer.listen(HTTP_PORT, () => {
        console.log(`${new Date().toLocaleString()} | HTTP:${HTTP_PORT} LISTENING`);
    });
}

async function runHttps() {
    const https = require('https');
    const fs = require('fs');

    const credentials = {
        key: fs.readFileSync('sslcert/key.pem'),
        cert: fs.readFileSync('sslcert/cert.pem')
    }

    const httpsServer = https.createServer(credentials, app);
    const HTTPS_PORT = 443

    httpsServer.listen(HTTPS_PORT, () => {
        console.log(`${new Date().toLocaleString()} | HTTPS:${HTTPS_PORT} LISTENING`);
    });
}