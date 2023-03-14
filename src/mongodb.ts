import { MongoClient, Db, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let cachedClient: MongoClient;
let cachedDb: Db;

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local',
  );
}

if (!dbName) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local',
  );
}

export async function connectToDatabase(): Promise<Db> {
  if (cachedClient) { // && cachedClient.isConnected()
    return cachedDb;
  }

  const client = await MongoClient.connect(uri as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return db;
}
