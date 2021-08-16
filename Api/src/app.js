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
const verificationemail = require ('./routes/verificationEmail');
const VerificationChangePassword = require ('./routes/VerificationChangePassword');
const changepassword = require('./routes/changePassword');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const cors = require('cors');


const server = express();


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

module.exports = server;
