import { createLogger, format, transports } from 'winston';

// Create a logger instance
const logger = createLogger({
  level: 'info', // Default logging level
  format: format.combine(
    format.timestamp(), // Add timestamp
    format.json() // Format log messages as JSON
  ),
  transports: [
    new transports.Console(), // Log to console
    new transports.File({ filename: 'error.log', level: 'error' }), // Log errors to a file
    new transports.File({ filename: 'combined.log' }) // Log all messages to a file
  ],
});

// Export the logger
export default logger;
