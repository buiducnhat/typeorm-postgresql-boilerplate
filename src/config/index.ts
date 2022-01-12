import * as dotenv from 'dotenv';
import { Algorithm as IJWTAlgorithm } from 'jsonwebtoken';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️ Couldn't find .env file ⚠️");
}

export default {
  /**
   * Server config
   */
  port: parseInt(process.env.PORT, 10),
  host: process.env.HOST,

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET,
  jwtAlgorithm: 'HS256' as IJWTAlgorithm,
  jwtExpireTimeNormal: process.env.JWT_EXPIRE_NORMAL,
  jwtExpireTimeLong: process.env.JWT_EXPIRE_LONG,

  /**
   * Database config
   */
  orm: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    testDatabase: process.env.DB_TEST_NAME,
  },

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },
  /**
   * Mailgun email credentials
   */
  emails: {
    apiKey: process.env.MAILGUN_API_KEY,
    apiUsername: process.env.MAILGUN_USERNAME,
    domain: process.env.MAILGUN_DOMAIN,
  },
  /**
   * Cloudinary config
   */
  cloudinary: {
    folder: process.env.CLOUDINARY_FOLDER,
    name: process.env.CLOUDINARY_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
};
