const cors = require('cors');
const  api = require('./api.js');
const { PORT } = require('./config');
const helmet = require('helmet');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(helmet());
app.use(express.json({type: ['application/json', 'text/plain']}));  
app.use('/', api);

app.listen(PORT, () => console.log(`Server start port - ${PORT}`));