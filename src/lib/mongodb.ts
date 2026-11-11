import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "linknamu";

// 개발 중 핫 리로드 때마다 연결이 새로 생기지 않도록 전역에 보관
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

function getClient(): Promise<MongoClient> | null {
  if (!uri) return null;
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect();
  }
  return globalForMongo._mongoClientPromise;
}

type ClickDoc = { _id: string; count: number };

async function clicksCollection() {
  const client = getClient();
  if (!client) return null;
  return (await client).db(dbName).collection<ClickDoc>("clicks");
}

export async function incrementClick(linkId: string) {
  const col = await clicksCollection();
  if (!col) return;
  await col.updateOne({ _id: linkId }, { $inc: { count: 1 } }, { upsert: true });
}

// MongoDB가 설정되지 않았거나 연결에 실패하면 빈 값을 돌려줌
export async function getClickCounts(): Promise<Record<string, number>> {
  try {
    const col = await clicksCollection();
    if (!col) return {};
    const docs = await col.find().toArray();
    return Object.fromEntries(docs.map((d) => [d._id, d.count]));
  } catch (error) {
    console.error("클릭 수를 불러오지 못했습니다:", error);
    return {};
  }
}
