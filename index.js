/** @format */

const express = require("express");
const { MongoClient, Collection } = require("mongodb");
require("dotenv").config();
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
const app = express();
const port = process.env.PORT || 5000;

// middlewere
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.apmnd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("portfolio");
    const projectsCollection = database.collection("projects");

    // Get Projects API
    app.get("/projects", async (req, res) => {
      const cursor = projectsCollection.find({});
      const projects = await cursor.toArray();
      res.send(projects);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Portfolio server in running.");
});

app.listen(port, () => {
  console.log(`Portfolio at http://localhost:${port}`);
});
