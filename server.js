const express = require('express')
// const bodyParser = require('body-parser')

const app = express();

app.set('view engine', 'ejs')
.use(express.static(__dirname + '/public'))
.use('/', require('./routes'))
.listen(process.env.PORT || 5000, () => {
    console.log("Listening on port 5000")
});

// Make sure the app can handle requests with JSON
// express.use(bodyParser.json())

module.exports = app;