import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI as string;
let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient> | undefined;

if (!uri) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env.local"
  );
}

if (process.env.NODE_ENV === "development") {
  //@ts-ignore
  if (!global._mongoClientPromise) {
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
  client = new MongoClient(uri, {
    //@ts-ignore
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  clientPromise = client.connect();
}

// Function to check if MongoDB connection is established
export async function isMongoConnected(): Promise<boolean> {
  try {
    await clientPromise; // Wait for the client promise to resolve
    //@ts-ignore
    return client?.isConnected() || false; // Check if client is connected
  } catch (error) {
    console.error("Error checking MongoDB connection:", error);
    return false;
  }
}

export default clientPromise;
