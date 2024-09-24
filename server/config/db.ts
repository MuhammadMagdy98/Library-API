import { Sequelize } from "sequelize";
import env from "./env";
import logger from "./logger";
const sequelize = new Sequelize(env.DB_NAME, env.DB_USERNAME, env.DB_PASSWORD, {
  host: "localhost",
  dialect: "postgres",
  port: env.DB_PORT,
});


export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Connection has been established successfully.");
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
  }
};

export default sequelize;
