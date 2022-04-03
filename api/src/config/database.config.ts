import { Sequelize } from "sequelize";

// come from postgres image and docker-compose.yml
const database = "postgres";
const userName = "admin";
const password = "admin";

const db = new Sequelize(database, userName, password, {
  host: "db",
  dialect: "postgres",
});

export default db;
