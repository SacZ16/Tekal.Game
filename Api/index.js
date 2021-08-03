const express = require ('express');
const routes = require('./routes/index.js')



const server = express();

server.use('/', routes);



server.listen(3001, () => {
    console.log('%s listening at 3001');
});