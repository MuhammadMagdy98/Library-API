import User from "../model/User";
import env from "./env";
import logger from "./logger";
import { hashPassword } from "../utils/password.util";
import InitializationFlag from "../model/InitializationFlag";
const initializeAdminEmails = async () => {
  const adminEmail = env.ADMIN_EMAIL;
  const adminPassword = env.ADMIN_PASSWORD;

  const adminInitFlag = await InitializationFlag.findOne({
    where: { key: "admin_initialized" },
  });

  if (adminInitFlag && adminInitFlag.value) {
    logger.info("Admin initialization already done, skipping...");
    return;
  }

  const existingAdmin = await User.findOne({ where: { email: adminEmail } });
  const hashedPassword = await hashPassword(adminPassword);
  const generatedName = adminEmail.substring(0, adminEmail.indexOf("@"));
  if (!existingAdmin) {
    await User.create({
      name: generatedName,
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });
    logger.info(`Admin created for ${adminEmail}`);
  } else {
    logger.info(`Admin already exists for ${adminEmail}`);
  }

  if (!adminInitFlag) {
    await InitializationFlag.create({
      key: "admin_initialized",
      value: true,
    });
  }
};

export default initializeAdminEmails;
