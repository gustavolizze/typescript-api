import mongoose from 'mongoose';
import { Environment } from 'environment';
import { Logger } from 'infra/logger';

export async function connect(): Promise<void> {
  mongoose.set(
    'debug',
    function (collectionName: string, methodName: string, ...args: any[]) {
      Logger.info({
        message: 'MongoDB Call',
        collectionName,
        methodName,
        args,
      });
    },
  );

  await mongoose.connect(Environment.mongo.url, {
    dbName: Environment.mongo.dbName,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    auth: {
      user: Environment.mongo.user,
      password: Environment.mongo.password,
    },
  });
}
