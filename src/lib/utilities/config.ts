const platform = <"production" | "development">process.env.NODE_ENV ?? "development";

const Config = {
  port: 4000,
  betterAuthUrl: {
    development: "http://localhost:4000",
    production: "http://localhost:4000"
  },
  origins: {
    development: ['http://localhost:3000'],
    production: []
  },
  httpHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
  httpMethods: ["POST", "PUT", "DELETE", "GET", "OPTIONS"]
};

export default function getConfig(key: keyof typeof Config) {
  if (typeof Config[key] !== 'object' || Array.isArray(Config[key])) {
    return Config[key];
  }
  const config = Config[key][platform];
  return config;
}