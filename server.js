const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, Sentience Education!');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Sever is listening on port ${port}`);
})