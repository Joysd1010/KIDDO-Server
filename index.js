const express = require('express');
const cors = require("cors");
const jwt = require('jsonwebtoken');
const app = express();
const port = 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()

app.use(cors());
app.use(express.json());

const verifyJwt = (req, res, next) => {
    const authorization = req.headers.authorization;
    // console.log(authorization)
    if (!authorization) {
        return res.status(401).send({ error: true, message: 'Unauthorized acces' })
    }
    const token = authorization.split(' ')[1]

    jwt.verify(token, process.env.API_TOKEN, (error, decode) => {

        if (error) {
            return res.status(401).send({ error: true, message: 'Unauthorized acces' })

        }
        req.decode = decode;
        next();
    })
}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oeyyszo.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {
        // await client.connect();
        // -----------declaring database collection
        const toy = client.db('KIDDO').collection('toy');
        const users = client.db('KIDDO').collection('users');
        const cart = client.db('KIDDO').collection('cart');
        const wish = client.db('KIDDO').collection('wish');
        

        app.post('/jwt', (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.API_TOKEN, { expiresIn: '1h' })
            // console.log(token)
            res.send({ token })
        })

        // -------------------------All toys of platform -------------------------
        app.get('/toy', async (req, res) => {
            const cursor = toy.find();
            const result = await cursor.toArray();
            res.send(result)
        })
        // ---------------------------toy detail page--------------------------------
        app.get('/toys/:id', async(req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = {_id: new ObjectId(id)}
            const user = await toy.findOne(query);
            res.send(user);
        })

        
        // -----------------------------Adding to cart-----------------------------
        app.post('/cart', async (req, res) => {
            const item = req.body
            const result = await cart.insertOne(item);
            res.send(result)
        })
        // -----------------------------Adding to wishlist-----------------------------
        app.post('/wish', async (req, res) => {
            const item = req.body
            const result = await wish.insertOne(item);
            res.send(result)
        })
        // -----------------------------Adding to Enroll list-----------------------------
       


       


        app.delete('/cart/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await carts.deleteOne(query);
            res.send(result)
          })

        //---------------------=========Getting the cart==================---------------------
        app.get('/cart', verifyJwt, async (req, res) => {
            const email = req.query.email;
            console.log(email)

            if (!email) {
                return res.send([])

            }
            const decodedEmail = req.decode.email;
            if (email !== decodedEmail) {
                return res.status(403).send({ error: true, message: 'Access forbidden' })
            }
            const query = { email: email };
            const result = await cart.find(query).toArray();

            res.send(result)
        })
        // ------------------------wish list getting------------------
        app.get('/wish', verifyJwt, async (req, res) => {
            const email = req.query.email;
            console.log(email)

            if (!email) {
                return res.send([])

            }
            const decodedEmail = req.decode.email;
            if (email !== decodedEmail) {
                return res.status(403).send({ error: true, message: 'Access forbidden' })
            }
            const query = { email: email };
            const result = await wish.find(query).toArray();

            res.send(result)
        })
        // --------------------------------------Saving the user data---------------------------

        app.post('/user', async (req, res) => {
            const item = req.body
            const query = { email: item.email }
            const existUser = await users.findOne(query)
            if (existUser) {
                return res.send({ message: 'This user is already exists' })
            }
            const result = await users.insertOne(item);
            res.send(result)
        })
        // -------------------------------------Verifying Instructor-------------------------
        app.get('/user/seller/:email', verifyJwt, async (req, res) => {
            const email = req.params.email
            if (req.decode.email !== email) {
              res.send({ Seller: false })
            }      
            const query = { email: email }
                  const prouser = await users.findOne(query)
            const result = { instructor: prouser?.role === 'seller' }
            res.send(result)
          })
        // -------------------------------------Verifying Admin-------------------------
        app.get('/user/seller/:email', verifyJwt, async (req, res) => {
            const email = req.params.email
            if (req.decode.email !== email) {
              res.send({ Admin: false })
            }      
            const query = { email: email }
                  const prouser = await users.findOne(query)
            const result = { instructor: prouser?.role === 'admin' }
            res.send(result)
          })



        await client.db("admin").command({ ping: 1 });
        //console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

    }
}
run().catch(console.dir);



app.get(('/'), (req, res) => {
    res.send('Site is working ')
})


app.listen(port, () => {
    console.log("server is running");
})