const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors())

const port = 8080;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/webhook', (req,res) =>{
    const post = req.body;
    console.log(post);
    res.send({status: "ok"})
})

app.listen(port, () => {
    console.log(`This server is running in port ${port}`)
})