const cors = require('cors')
const  api = require('./api.js');
const { PORT } = require('./config');
const helmet = require('helmet');
const express = require('express');
const cookieParser = require('cookie-parser');
const corsOptions = {origin: true, credentials:true, };
const app = express();
app.use(express.json({type: ['application/json', 'text/plain']}));  
app.use(express.urlencoded({extended:true})); 
app.use(cookieParser());
app.use('/', api);
app.use(cors(corsOptions));
app.use(helmet());

app.listen(PORT, () => console.log(`Server start port - ${PORT}`));