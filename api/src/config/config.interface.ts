export interface Config {
  security: SecurityConfig;
  database: DatabaseConfig;
  app: AppConfig;
}

export interface AppConfig {
  port: number;
}
export interface SecurityConfig {
  expiresIn: string;
  refreshIn: string;
  bcryptSaltOrRound: string | number;
}

export interface DatabaseConfig {
  url: string;
}
