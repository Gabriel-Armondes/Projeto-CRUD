const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', routes);

app.listen(3001, () => {  // Mude para 3001
    console.log('Servidor rodando em http://localhost:3001');
});