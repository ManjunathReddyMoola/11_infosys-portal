const express = require('express');
const app  = express();
const mongodb = require('./database/dbOperations');
const router = require('./router/appRouting');

const hostname = '127.0.0.1';
const port = 9000;

app.get('/',(request , response) => {
    response.send(`<h2>Welcome to Infosys Portal Please Use /api/employees/ path Dude</h2>`);
});

// Application Routing
router.mapRoutes(app);

// Create Database Connection
mongodb.mongoConnet(() => {
    app.listen(port,hostname, (request , response) => {
        console.log(`Server is started at http://${hostname}:${port}`);
    });
});
