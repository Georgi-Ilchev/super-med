const express = require('express');
const app = express();

// require('./config/express')(app);
require('./config/mongoose')(app);

app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(5000, () => console.log(`Server is listening on port 5000`));