import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: false,
  ssl: process.env.POSTGRES_SSL === "true",
  extra: {
    ssl:
      process.env.POSTGRES_SSL === "true"
        ? {
            rejectUnauthorized: false,
          }
        : null,
  },
  entities: [__dirname + "/src/**/*.entity{.ts,.js}"],
  migrations: ["./src/migrations/*{.ts,.js}"],
  migrationsTableName: "tabla_de_migracion",
});
