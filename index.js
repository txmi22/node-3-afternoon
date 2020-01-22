require("dotenv").config();
const express = require("express");
const massive = require("massive");
const cors = require("cors");
const products_controller = require("./products_controller")

const app = express();

const {SERVER_PORT, CONNECTION_STRING} = process.env;

massive(CONNECTION_STRING)
    .then(db => {
      app.set('db', db);
      console.log('db connected')
    })
    .catch(err => console.log(err));

app.use(cors());
app.use(express.json());

app.post('/api/products', products_controller.create)
app.get('/api/products', products_controller.getAll)
app.get('/api/products/:id', products_controller.getOne)
app.put('/api/products/:id', products_controller.update)
app.delete('/api/products/:id', products_controller.delete)


app.listen(SERVER_PORT, () => { console.log(`Running on ${SERVER_PORT}.`)
});