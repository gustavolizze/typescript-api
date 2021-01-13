interface MongoDb {
  url: string;
  dbName: string;
  user: string;
  password: string;
}

export interface UniqueEnvironment {
  name: string;
  endpointTimeout: number;
  mongo: MongoDb;
}

export interface CommonEnvironment {
  isDev: boolean;
  port: number;
}

export interface AllEnvironments {
  all: CommonEnvironment;
  dev: UniqueEnvironment;
  staging: UniqueEnvironment;
  production: UniqueEnvironment;
}
