// lib/mongodb.js

import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
let client;
let clientPromise;

if (!uri) {
  console.log("no uri");
  throw new Error("Please add your Mongo URI to .env.local");
}
if (process.env.NODE_ENV === "development") {
  //@ts-ignore
  if (!global._mongoClientPromise) {
    //@ts-ignore
    client = new MongoClient(uri, {
      //@ts-ignore

      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    //@ts-ignore
    global._mongoClientPromise = client.connect();
  }
  //@ts-ignore
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable
  //@ts-ignore
  client = new MongoClient(uri, {
    //@ts-ignore

    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  clientPromise = client.connect();
}

export default clientPromise;
