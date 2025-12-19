import { defineConfig } from "prisma/config";
import { PrismaPg } from "@prisma/adapter-pg";

export default defineConfig({
  migrate: {
    datasource: "db",
  },
  datasource: {
    db: {
      adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL,
      }),
    },
  },
});

