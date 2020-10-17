const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vwtzw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const port =5000;

const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });

app.get('/', (req, res) => {
    res.send('Hello creative agency')
})

client.connect(err => {
    const serviceCollection = client.db(`${process.env.DB_NAME}`).collection('services');
    const reviewCollection = client.db(`${process.env.DB_NAME}`).collection('reviews');
    const userServiceCollection = client.db(`${process.env.DB_NAME}`).collection('userServices');

    app.post('/reviews', (req, res) => {
        const event = req.body;
        console.log(event);

        reviewCollection.insertOne(event)
        .then(result => {
          res.redirect('http://localhost:3000/user');
          console.log("added event succesful");
        })
    })

    app.get('/reviews',(req, res) => {
        reviewCollection.find({})
        .toArray( ( err, documents) => {
          res.send(documents);
        })
      })

      app.post('/userServices', (req, res) => {
        const event = req.body;
        console.log(event);

        userServiceCollection.insertOne(event)
        .then(result => {
          res.redirect('http://localhost:3000/user');
          console.log("added event succesful");
        })
    })

    app.get('/userServices',(req, res) => {
        userServiceCollection.find({})
        .toArray( ( err, documents) => {
          res.send(documents);
        })
      })


  app.post('/addService',(req, res) => {
        const event = req.body;
        console.log(event);

        serviceCollection.insertOne(event)
        .then(result => {
          res.redirect('http://localhost:3000/admin');
          console.log("added event successful");
        })

        })
  
        app.get('/addService',(req, res) => {
          serviceCollection.find({})
          .toArray( ( err, documents) => {
            res.send(documents);
          })
        })


})




app.listen(process.env.PORT || port);