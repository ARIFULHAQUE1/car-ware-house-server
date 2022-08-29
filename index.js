const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4j9kaod.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {

  // perform actions on the collection object
  client.close();
});




async function run() {
  try{
   await client.connect();
  //  all inventorys item
   const inventoryCollection = client.db("carhouse").collection("inventorys");
    app.get('/inventory',async (req,res) =>{
      const query = {};
      const cursor = inventoryCollection.find(query);
      const inventory = await cursor.toArray();
      res.send(inventory);
    })

  }
  finally{

  }

} run().catch(console.dir)


app.get('/', (req, res) => {
  res.send('Hello ware house !')
})

app.listen(port, () => {
  console.log(` listening on ware-house-car ${port}`)
})
