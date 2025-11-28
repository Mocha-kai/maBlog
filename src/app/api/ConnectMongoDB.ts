import mongoose, { Mongoose } from 'mongoose';

type CustomGlobalThis = typeof globalThis & {
    mongooseCache?: {
        conn?: Mongoose;
        promise?: Promise<Mongoose>;
    };
};

let cached = (globalThis as CustomGlobalThis).mongooseCache;
if (!cached) cached = (globalThis as CustomGlobalThis).mongooseCache = { conn: undefined, promise: undefined };

//===
const MONGO_URI = process.env.MONGO_URI;




export const ConnectMongoDB = async (): Promise<Mongoose> => {
    if (cached.conn && cached.conn.connection.readyState === 1) return cached.conn;
    if (cached.promise) return cached.promise;

    const opts = {
        bufferCommands: false,
        authSource: 'admin',
    };
    if (!MONGO_URI) throw new Error('MONGO_URI ERROR');

    cached.promise = mongoose.connect(MONGO_URI, opts).then((m) => m);

    try {
        const mongoConnection = await cached.promise;
        cached.conn = mongoConnection;
        console.log('MongoDB Connected');
        return mongoConnection;
    } catch (e) {
        console.error('ConnectMongDB fail:', e);
        cached.promise = undefined;
        throw e;
    }
};
