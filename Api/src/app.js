const express = require('express');
const routes = require('./routes/index.js');
const login = require('./routes/login');
const register = require('./routes/register');
const loginGooandFace = require('./routes/loginFaceandGoo');
const countries = require('./routes/countries');
const creationTable = require('./routes/creationTable');
const personalInfo = require('./routes/personalInfo');
const datauser = require('./routes/datauser');
const links = require('./routes/links');
const info = require('./routes/assetsVideoInfo');
const game = require('./routes/userGameInfo');
const verificationemail = require('./routes/verificationEmail');
const VerificationChangePassword = require('./routes/VerificationChangePassword');
const changepassword = require('./routes/changePassword');
const assetsImages = require("./routes/loadingImages")
const averageScore = require("./routes/averageScore")
const assets = require('./routes/loadingAssets');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const cors = require('cors');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


const server = express();


const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for JSONPlaceholder',
        version: '1.0.0',
    },
    servers: [
        {
            url: 'http://localhost:3001',
            description: 'Development server',
        },
    ],
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(options);

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

server.use(cors(corsOptions));
server.use(bodyparser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyparser.json({ limit: '50mb' }));
server.use(morgan('dev'));


server.use('/', routes);
server.use('/country', countries);
server.use('/login', login);
server.use('/register', register);
server.use('/logingoogle', loginGooandFace);
server.use('/addinfo', personalInfo);
server.use('/createtable', creationTable);
server.use('/info', datauser);
server.use('/links', links);
server.use('/videoInfo', info);
server.use('/gameInfo', game);
server.use('/verification', verificationemail);
server.use('/verificationchangepassword', VerificationChangePassword);
server.use('/changepassword', changepassword);
server.use('/assets', assets);
server.use('/loadingImages', assetsImages)
server.use('/averageScore', averageScore)
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


module.exports = server;
