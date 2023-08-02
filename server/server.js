import express from "express";
import cors from "cors"; 
import bodyParser from "body-parser"; 

const app = express();

app.use(cors())

app.use(bodyParser.json()) // middleware to parse incoming data from HTTP request as JSON and convert them into JavaScript objects
app.use(bodyParser.urlencoded({extended: true})) //Midđleware to parses incoming data from HTTP requests as URL-encoded and converts them into JavaScript objects


app.get('/search/get', (req, res) => {
    setTimeout(() => {
        return res.json(req.query.key_words)
    }, 1000)
})

app.get('/', (req, res) => {
    res.send('Welcome')
})

const port = 8010;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
