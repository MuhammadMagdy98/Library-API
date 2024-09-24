import Borrower from "../model/Borrower";
import env from "./env";
import logger from "./logger";
const initializeAdminEmails = async () => {
  const adminEmails = env.ADMIN_EMAILS;
  for (const email of adminEmails) {
    const existingAdmin = await Borrower.findOne({ where: { email } });
    const generatedName = email.substring(0, email.indexOf('@'));
    if (!existingAdmin) {
      await Borrower.create({
        name: generatedName,
        email,
        role: "admin",
        registeredDate: new Date(),
      })
      logger.info(`Admin borrower created for ${email}`);
      
    } else {
      logger.info(`Admin borrower already exists for ${email}`);
    }
  }
};

export default initializeAdminEmails;
