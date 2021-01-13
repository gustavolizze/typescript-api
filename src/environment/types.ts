export interface UniqueEnvironment {
  name: string;
  endpointTimeout: number;
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
