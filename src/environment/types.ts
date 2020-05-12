export interface UniqueEnvironment {
  name: string;
}

export interface CommonEnvironment {
  isDev: boolean;
}

export interface AllEnvironments {
  all: CommonEnvironment;
  dev: UniqueEnvironment;
  staging: UniqueEnvironment;
  production: UniqueEnvironment;
}
