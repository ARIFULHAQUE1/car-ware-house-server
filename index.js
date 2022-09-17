const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4j9kaod.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    //  all inventorys item
    const inventoryCollection = client.db("carhouse").collection("inventorys");
    app.get('/inventory', async (req, res) => {
      const query = {};
      const cursor = inventoryCollection.find(query);
      const inventory = await cursor.toArray();
      res.send(inventory);
    })
// load single item from database 
    app.get('/inventory/:id', async (req, res) => {
      const id = req.params.id;
     
      const query = {_id: ObjectId(id) };
      const result = await inventoryCollection.findOne(query);
      res.send(result);
    })

//  handle quantity and delivered quantity

    app.put('/handleQuantity/:id', async (req,res)=>{
      const id = req.params.id;
      const updateQuantity = req.body;
     
      const filter = {_id: ObjectId(id)};
      const options = { upsert: true };
        const updateDoc = {$set : updateQuantity}
        const result = await inventoryCollection.updateOne(filter,  updateDoc,options)
      res.send(result)
    })

// update qunatity
    app.put('/updateQuantity/:id', async (req,res)=>{
      const id = req.params.id;
      const updateQuantity = req.body;
   
      const filter = {_id: ObjectId(id)};
      const options = { upsert: true };
        const updateDoc = {$set : updateQuantity}
        const result = await inventoryCollection.updateOne(filter,  updateDoc,options)
      res.send(result)
    })

    // Delete item from database
    app.delete('/inventory/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id: ObjectId(id) };
      const result = await inventoryCollection.deleteOne(query);
      res.send(result);
    })

  }
  finally {

  }

} run().catch(console.dir)




app.listen(port, () => {
  console.log(` listening on ware-house-car ${port}`)
})
