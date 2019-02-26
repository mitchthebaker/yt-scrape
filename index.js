const express = require('express');
const PORT = process.env.PORT || 5004;
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/scripts')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {

});
app.listen('Currently listening on port: ' + PORT);